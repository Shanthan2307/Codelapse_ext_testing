import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { Session } from '../../models';
import { LogStreamer } from '../../storage/LogStreamer';

/**
 * End-to-end checks of folder-scoped recording inside a real VS Code.
 * The workspace (created by runIntegration.ts) contains two projects:
 *   projectA/src/a.js   projectB/b.js
 */
const workspace = process.env.CODELAPSE_TEST_WORKSPACE!;
const storageDir = process.env.CODELAPSE_TEST_STORAGE!;
const projectA = vscode.Uri.file(path.join(workspace, 'projectA'));
const projectB = vscode.Uri.file(path.join(workspace, 'projectB'));
const fileA = path.join(workspace, 'projectA', 'src', 'a.js');
const fileB = path.join(workspace, 'projectB', 'b.js');

/** Longer than the tracker's 500ms debounce, so each burst becomes its own snapshot. */
const AFTER_DEBOUNCE_MS = 750;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Types `text` at the end of a file one character at a time, like keystrokes. */
async function typeInto(filePath: string, text: string): Promise<vscode.TextDocument> {
  const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(filePath));
  const editor = await vscode.window.showTextDocument(doc);
  for (const ch of text) {
    await editor.edit((eb) => eb.insert(doc.positionAt(doc.getText().length), ch));
  }
  await sleep(AFTER_DEBOUNCE_MS);
  return doc;
}

function sessionLogs(): string[] {
  if (!fs.existsSync(storageDir)) {
    return [];
  }
  return fs
    .readdirSync(storageDir)
    .filter((f) => /^codelapse-\d+\.jsonl$/.test(f))
    .sort()
    .map((f) => path.join(storageDir, f));
}

/** Rebuilds the newest session purely from its on-disk append-only log. */
async function newestSessionFromDisk(): Promise<{ session: Session; records: any[] }> {
  const logs = sessionLogs();
  assert.ok(logs.length > 0, 'expected a session log on disk');
  const newest = logs[logs.length - 1];
  const records = fs
    .readFileSync(newest, 'utf-8')
    .split('\n')
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l));
  const session = await LogStreamer.readSessionFromLog(vscode.Uri.file(newest));
  assert.ok(session, 'log should parse into a session');
  return { session: session!, records };
}

function lastContentOf(session: Session, filePath: string): string | undefined {
  const snaps = session.snapshots.filter((s) => s.filePath === filePath);
  return snaps[snaps.length - 1]?.content;
}

describe('Folder-scoped recording (real VS Code)', () => {
  before(async () => {
    const ext = vscode.extensions.getExtension('shanthan2307.codelapse');
    assert.ok(ext, 'extension should be installed in the test host');
    await ext!.activate();
    await sleep(500);
  });

  it('records nothing until a folder is chosen', async () => {
    await typeInto(fileA, 'ignored();');
    const stopped = await vscode.commands.executeCommand<Session | undefined>('codelapse.stopSession');
    assert.strictEqual(stopped, undefined, 'no session should be running yet');
    assert.strictEqual(sessionLogs().length, 0, 'no log should have been written');
  });

  it('records only files inside the chosen folder, with folder-relative paths', async () => {
    const started = await vscode.commands.executeCommand<Session>('codelapse.selectFolder', projectA);
    assert.strictEqual(started?.workspaceName, 'projectA');

    await typeInto(fileA, '\nconst a = 1;');
    await typeInto(fileB, '\nconst outside = true;');
    const docA = await typeInto(fileA, '\nconst b = 2;');

    const session = await vscode.commands.executeCommand<Session>('codelapse.stopSession');
    assert.ok(session, 'stop should return the finished session');
    assert.strictEqual(session!.workspaceName, 'projectA');

    const files = new Set(session!.snapshots.map((s) => s.filePath));
    assert.deepStrictEqual([...files], ['src/a.js'], 'only project A files, relative to project A');

    // In-memory (live) view and the on-disk log must both hold the real file text.
    assert.strictEqual(lastContentOf(session!, 'src/a.js'), docA.getText());
    const { session: fromDisk } = await newestSessionFromDisk();
    assert.strictEqual(lastContentOf(fromDisk, 'src/a.js'), docA.getText());
  });

  it('starts every new session with a keyframe so it replays from disk', async () => {
    // Folder is remembered, so Start needs no picker. The file was already
    // edited in the previous session in this same window.
    const started = await vscode.commands.executeCommand<Session>('codelapse.startSession');
    assert.strictEqual(started?.workspaceName, 'projectA');

    await typeInto(fileA, '\nconst c = 3;');
    const docA = await typeInto(fileA, '\nconst d = 4;');
    await vscode.commands.executeCommand('codelapse.stopSession');

    const { session, records } = await newestSessionFromDisk();
    const firstFrame = records.find((r) => (r.type === 'keyframe' || r.type === 'delta') && r.data.filePath === 'src/a.js');
    assert.strictEqual(firstFrame?.type, 'keyframe', 'first frame of a file in a new session must be a keyframe');
    assert.strictEqual(lastContentOf(session, 'src/a.js'), docA.getText());
  });

  it('switching folders saves the old session and records only the new folder', async () => {
    await vscode.commands.executeCommand('codelapse.selectFolder', projectA);
    await typeInto(fileA, '\n// before switching');
    const logsBefore = sessionLogs();

    const switched = await vscode.commands.executeCommand<Session>('codelapse.selectFolder', projectB);
    assert.strictEqual(switched?.workspaceName, 'projectB');

    // The project A session was closed off on disk before B started.
    const previousLog = fs.readFileSync(logsBefore[logsBefore.length - 1], 'utf-8');
    assert.ok(previousLog.includes('"type":"session_end"'), 'previous session should be ended');

    await typeInto(fileA, '\n// not recorded');
    const docB = await typeInto(fileB, '\nconst inB = 1;');
    const session = await vscode.commands.executeCommand<Session>('codelapse.stopSession');

    const files = new Set(session!.snapshots.map((s) => s.filePath));
    assert.deepStrictEqual([...files], ['b.js']);
    assert.strictEqual(lastContentOf(session!, 'b.js'), docB.getText());
  });
});
