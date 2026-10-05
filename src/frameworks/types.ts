import type * as vscode from 'vscode';

export type FrameworkType = 'react' | 'node' | 'django';

export interface IFrameworkWatcher {
  readonly framework: FrameworkType;
  /**
   * Processes raw terminal output chunks to detect framework-specific lifecycles.
   */
  processTerminalOutput(terminalName: string, text: string): void;
  /**
   * Inspects saved document contents for framework structural patterns.
   */
  /**
   * Inspects a saved document for framework structural patterns. `filePath` is
   * relative to the recorded folder; never record the absolute path, which
   * would expose the user's directory layout and username.
   */
  processDocumentSaved?(document: vscode.TextDocument, filePath: string): void;
  dispose(): void;
}
