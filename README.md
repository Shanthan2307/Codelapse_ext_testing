# ⚡ CodeLapse — Tester Guide

Thank you for testing **CodeLapse**, a VS Code extension that records *how* you write code so you can replay it later like a video.

This guide walks you through everything: installing the extension, building a small **React + Node.js** app while it records, exploring the replay, and sending us your data and feedback.

**Total time: about 1.5–2 hours.**

| Step | What you do | Time |
|---|---|---|
| [1](#1-install-codelapse) | Install CodeLapse | 5 min |
| [2](#2-create-your-project-folder-and-start-recording) | Create a project folder and start recording | 5 min |
| [3](#3-build-studyboard-react--nodejs) | Build **StudyBoard**, a small React + Node.js app | 45–90 min |
| [4](#4-stop-recording-and-explore-your-replay) | Stop recording and explore your replay | 10–15 min |
| [5](#5-optional-try-to-break-it) | *(Optional)* Try to break it | 10 min |
| [6](#6-save-and-send-your-session-data) | Save and send your session data | 5 min |
| [7](#7-fill-in-the-feedback-form) | Fill in the feedback form | 10 min |
| [8](#8-uninstall-and-clean-up) | Uninstall and clean up | 2 min |

> [!IMPORTANT]
> **CodeLapse records what you type.** It only records files inside the one folder you choose, keeps everything on your own computer, and sends nothing anywhere by itself. Still: **only use it on the StudyBoard test project**, and stop recording or uninstall it before working on anything private. Details in [What is recorded](#what-is-recorded).

---

## The problem we're trying to solve

When you hand in code, only the **final result** survives. *How* you got there — the approach you started with, where you got stuck, the bug that took 20 minutes, the refactor that made it click — disappears.

That process is where most learning happens, yet nobody can see it:

- **Students** can't look back at how they actually work, so it's hard to notice habits or improve them.
- **Instructors, TAs and mentors** can only give feedback on the finished code, not on the path to it.
- **Showing your own work** is getting harder: a finished file looks the same whether you wrote it line by line or pasted it in.
- **Existing options don't fit.** Git commits are too coarse (and students rarely commit often), and screen recordings are huge, hard to search and record everything on screen.

CodeLapse is an attempt at a lightweight, code-aware record of the process.

## What CodeLapse does

1. **Records one folder you choose.** Every edit to files inside that folder is captured quietly in the background while you code normally.
2. **Replays your session like a video.** Watch your code being typed character by character, with the cursor, at 1x–10x speed. Idle gaps are skipped, and you can scrub to any moment.
3. **Marks key moments.** Test runs show up on the timeline as ✓ (passed) or ✕ (failed), so you can jump straight to "where it broke" and "where it got fixed".
4. **Summarizes your session.** Duration, estimated keystrokes, lines written, an activity chart over time, and a generated commit message / PR description / standup update. *(In this version the summary is built from rules and templates, not an AI model.)*
5. **Exports a shareable report.** A single HTML file that anyone can open in a browser to watch your replay, with no VS Code needed.

## How it works (briefly)

- **Capturing edits.** VS Code tells CodeLapse about every change ("at character 412, inserted `x`"). Rapid keystrokes are grouped: once you pause for half a second, the burst is saved as one snapshot.
- **Saving space.** Like video compression, CodeLapse stores the full file only occasionally (a *keyframe*) and just the small changes (*deltas*) in between.
- **Saving safely.** Each change is appended as one line to a log file on your computer, so recording stays fast and nothing is lost if VS Code closes.
- **Replaying.** The player rebuilds the file at every moment from those keyframes and deltas, then animates the difference between moments so it looks like typing.
- **Test runs.** When you run tests as a VS Code *Task*, CodeLapse notes whether they passed or failed.

---

## Before you start

You need:

- **[Visual Studio Code](https://code.visualstudio.com/) 1.85 or newer** (Help → About shows your version). Other editors based on VS Code (like Cursor) may work but are not tested.
- **[Node.js](https://nodejs.org/) 20 or newer** (run `node --version` in a terminal). The LTS version is a good choice.
- About 2 hours, ideally in one sitting.

## 1. Install CodeLapse

1. **Download the extension file:** [**codelapse.vsix**](https://github.com/Shanthan2307/Codelapse_ext_testing/releases/latest/download/codelapse.vsix) (from the [latest release](https://github.com/Shanthan2307/Codelapse_ext_testing/releases/latest)).
2. Open VS Code and go to the **Extensions** view (the four-squares icon on the left, or `Cmd+Shift+X` / `Ctrl+Shift+X`).
3. Click the **`···`** menu at the top of the Extensions view and choose **Install from VSIX…**
4. Select the downloaded `codelapse.vsix`. If VS Code asks to reload, click **Reload**.

<details>
<summary>Prefer the terminal?</summary>

```bash
code --install-extension codelapse.vsix
```
</details>

## 2. Create your project folder and start recording

1. Create an **empty** folder named `studyboard-<yourname>` (for example `studyboard-alex`) somewhere easy, like your Desktop.
2. In VS Code: **File → Open Folder…** and open that folder. If VS Code asks whether you trust the folder, either answer works.
3. CodeLapse will ask: *"CodeLapse is not recording yet. Choose the folder you are working in…"*. Click **Choose Folder** and pick **`studyboard-<yourname>`**.
   - Missed the message? Click **`CodeLapse: Choose folder`** in the status bar (bottom right).
4. **Check the status bar.** It should now say **`CodeLapse: studyboard-<yourname>`** with a record icon. That means it's recording, and only files inside that folder count.

> [!TIP]
> Always choose the **top** `studyboard-<yourname>` folder (the one that will contain both `client` and `server`), not one of the subfolders.

## 3. Build StudyBoard (React + Node.js)

Build a small **study task tracker**: a Node.js backend that stores tasks, and a React frontend to view and manage them.

**Code the way you normally would.** Use documentation, search engines or AI assistants if that's what you usually do; the feedback form will simply ask what you used. There's no grade: an unfinished app is still useful data.

Your folder should end up looking like this:

```
studyboard-<yourname>/
├── server/        ← Node.js + Express backend
└── client/        ← React frontend (created with Vite)
```

### 3.1 Backend: set up the server

In VS Code open a terminal (**Terminal → New Terminal**) and run:

```bash
mkdir server
cd server
npm init -y
npm install express
```

Create `server/index.js` with an Express server listening on port **3001**.

### 3.2 Backend: the tasks API

Keep tasks in memory (a plain array, no database needed). Each task has an `id`, a `title`, a `subject` (like "Math") and `done` (true/false). Add these routes:

| Method | Route | What it does |
|---|---|---|
| `GET` | `/api/tasks` | Return all tasks |
| `POST` | `/api/tasks` | Create a task from `{ title, subject }`. Respond **400** if the title is empty. |
| `PATCH` | `/api/tasks/:id` | Toggle `done` |
| `DELETE` | `/api/tasks/:id` | Delete the task |

Start it with `node --watch index.js` (restarts automatically when you save).

### 3.3 Backend: a test, run as a VS Code Task

This step is important: it is how CodeLapse sees test results.

1. Move your title check into its own file, `server/validateTask.js`, exporting a function like `validateTask(body)` that returns an error message (or `null` when valid). Use it in your `POST` route.
2. Write `server/validateTask.test.js` using Node's built-in test runner (`node:test` and `node:assert`), with a few cases: empty title, missing title, valid task.
3. In `server/package.json`, set the test script to: `"test": "node --test"`
4. Run the tests with **Terminal → Run Task… → `npm: test - server`**.

> [!IMPORTANT]
> Tests must be run through **Run Task**. Typing `npm test` in the terminal works, but CodeLapse can't see the result.
>
> It's fine (even useful!) if a test **fails first** and passes after you fix it: both results show up on your replay timeline.

### 3.4 Frontend: create the React app

Open a **second** terminal in the `studyboard-<yourname>` folder (keep the server running in the first) and run:

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm run dev
```

If it asks extra questions, accept the defaults. Open the address it prints (usually http://localhost:5173).

To let the frontend call your backend, add a proxy in `client/vite.config.js`:

```js
server: {
  proxy: { '/api': 'http://localhost:3001' },
},
```

Now `fetch('/api/tasks')` in React reaches your server.

### 3.5 Frontend: build the UI

In `client/src/App.jsx` (you can split it into components if you like):

- [ ] Load and show the task list from `GET /api/tasks`
- [ ] A form to add a task (title + subject) using `POST /api/tasks`
- [ ] A checkbox to mark a task done (`PATCH`)
- [ ] A delete button (`DELETE`)
- [ ] Show how many tasks are left to do
- [ ] Show the error message when someone submits an empty title

### 3.6 Polish (if you have time)

Some styling in `client/src/App.css`, filtering by subject, or anything else you like.

> [!TIP]
> **Halfway through**, open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`) and run **`CodeLapse: Show Session Report & Analytics`** to peek at your session while it records. Then keep coding.

## 4. Stop recording and explore your replay

1. Command Palette → **`CodeLapse: Stop Recording Session`**. Your report opens automatically.
2. Try each of these and note anything confusing or broken:
   - [ ] **Play** the timelapse. Watch the code being typed and the file tabs switching.
   - [ ] Change the **speed** (1x / 2x / 5x / 10x) and toggle **Skip idle**.
   - [ ] **Drag the timeline**, and use **⏮ / ⏭** to step between snapshots.
   - [ ] Keyboard: **Space** (play/pause), **← →** (step), **Home / End**.
   - [ ] Click a **✓ / ✕** test marker on the timeline to jump to that moment.
   - [ ] Click a **file tab** to jump to when that file first appeared.
   - [ ] **Hover** over the bars of the activity chart.
   - [ ] Read the **summary** tabs: commit message, pull request summary, standup.
   - [ ] Command Palette → **`CodeLapse: Export Standalone HTML Report`**, save it, and open it in your browser.

## 5. *(Optional)* Try to break it

Each of these checks a specific behavior. Note what you expected versus what happened.

- [ ] **Restart VS Code.** It should resume recording `studyboard-<yourname>` automatically (check the status bar). This starts a new session, which is expected.
- [ ] **Edit a file outside** your StudyBoard folder. It should *not* appear in the replay.
- [ ] **Paste** a large block of code, then **delete** a big chunk.
- [ ] Edit with **multiple cursors** (`Alt`/`Option` + click), or **rename** a file.
- [ ] **Switch folders:** right-click the `client` folder in the Explorer → **CodeLapse: Choose Folder to Record**, type a little, then switch back to the top `studyboard-<yourname>` folder the same way.

Stop recording again when you're done (**`CodeLapse: Stop Recording Session`**).

## 6. Save and send your session data

### 6.1 Save it to a folder

1. Command Palette → **`CodeLapse: Save Session Data to Folder`**
2. A list of your recorded sessions appears. Sessions for your StudyBoard folder are **already ticked**. Untick anything that isn't StudyBoard, then press **Enter**.
3. Choose where to save (your Desktop is fine). A folder named `codelapse-data-studyboard-<yourname>-<date>` is created and opened for you. It contains:
   - `codelapse-<number>.jsonl`: the raw recording of each session
   - `codelapse-<number>.json`: a snapshot of each session
   - `codelapse-<number>-report.html`: the replay for each session, viewable in any browser

### 6.2 Zip it

- **macOS:** right-click the folder → **Compress**
- **Windows:** right-click the folder → **Send to → Compressed (zipped) folder**
- **Linux:** right-click → **Compress…**, or `zip -r data.zip codelapse-data-*`

Rename the zip to **`<yourname>-codelapse-data.zip`**.

> [!NOTE]
> You don't need to send your StudyBoard project folder itself. The recording already contains your code. Please don't send `node_modules`.

### 6.3 Send it (choose one)

**Option A: Google Drive** *(recommended; only the test coordinators can see it)*

<!-- DRIVE_LINK: replace the line below with the real upload link -->
📁 **Upload folder:** *link coming soon. Your test coordinator will add it here.*

Open the link and upload your `<yourname>-codelapse-data.zip` into the folder.

**Option B: GitHub**

1. Open a [**📦 Session data submission**](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=session_data.yml) issue (needs a free GitHub account).
2. Drag your zip into the form and submit.

> [!WARNING]
> This repository is **public**: anything attached to an issue can be seen by anyone. Use Google Drive if you'd rather keep your data private.

## 7. Fill in the feedback form

<!-- FEEDBACK_FORM_LINK: replace the line below with the real form link -->
📝 **Feedback form:** *link coming soon. Your test coordinator will add it here.*

It takes about 10 minutes. Please use the **same name** as on your zip file so we can match your feedback to your data.

**Found a bug?** At any time, open a [**🐞 Bug report**](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=bug_report.yml). Screenshots help a lot.

## 8. Uninstall and clean up

1. **Extensions** view → find **CodeLapse** → **Uninstall**.
2. Recordings stay on your computer until you delete them. They're in this folder (if you use Cursor, replace `Code` with `Cursor`):

   | OS | Folder |
   |---|---|
   | macOS | `~/Library/Application Support/Code/User/globalStorage/shanthan2307.codelapse` |
   | Windows | `%APPDATA%\Code\User\globalStorage\shanthan2307.codelapse` |
   | Linux | `~/.config/Code/User/globalStorage/shanthan2307.codelapse` |

   Delete that folder to remove every recording.

---

## What is recorded

| Recorded | **Not** recorded |
|---|---|
| The text of files you edit **inside the folder you chose** | Files outside that folder |
| File names, relative to that folder (e.g. `client/src/App.jsx`) | Anything in `node_modules` or `.git` |
| Cursor position and selections, with timestamps | Your full computer paths or username |
| Test/build tasks you run: their name and pass/fail | Terminal output, other apps, browsing |
| The chosen folder's name | — |

Everything is stored **only on your computer**. CodeLapse never uploads anything; you decide what to send in step 6.

## Known limitations in this version

- **Server, hot-reload and npm-install markers don't appear.** The ⚛️ 🚀 📦 timeline markers you may see in our demo rely on a VS Code feature that installed extensions can't use yet. Only test/build **Tasks** (✓/✕) and React hook usage (detected on save) are marked.
- **Tests must be run via Terminal → Run Task** to be recorded (see [3.3](#33-backend-a-test-run-as-a-vs-code-task)).
- **New unsaved files** ("Untitled") are recorded only once you save them inside the chosen folder.
- **Syntax colors** in the replay can look slightly off for code spanning several lines, such as multi-line comments.
- **The summary** (commit message, PR, standup) is generated from rules and templates, not an AI model.

## Troubleshooting

<details>
<summary>The status bar doesn't show CodeLapse at all</summary>

Check the extension is installed and enabled in the Extensions view, then run **Developer: Reload Window** from the Command Palette.
</details>

<details>
<summary>The status bar says "Choose folder" or "Not recording"</summary>

Click it. "Choose folder" lets you pick the folder; "Not recording" starts recording the folder you chose before.
</details>

<details>
<summary>My replay is empty or missing a file</summary>

Only files **inside the chosen folder** are recorded. Check the status bar shows `studyboard-<yourname>` and not a subfolder or another folder. To switch, run **`CodeLapse: Choose Folder to Record`**.
</details>

<details>
<summary>My test runs don't show up on the timeline</summary>

Run them with **Terminal → Run Task… → `npm: test - server`**, not by typing `npm test`. If the task isn't listed, check `server/package.json` has a `"test"` script.
</details>

<details>
<summary>The "Save Session Data" list doesn't show my StudyBoard session</summary>

If you're still recording, CodeLapse asks to stop first; choose **Stop and Continue**. Each restart of VS Code or folder switch creates a separate session: include all the StudyBoard ones.
</details>

Still stuck? Open a [🐞 Bug report](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=bug_report.yml).

---

*Curious how it's built? See the [developer documentation](docs/DEVELOPER.md) and the source in [`src/`](src/).*
