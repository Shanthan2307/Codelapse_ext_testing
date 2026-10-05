# 🐣 CodeLapse Beginner Guide: build StudyBoard step by step

**New to coding? This guide is for you.** You don't need to understand the code. You'll follow exact steps: create this folder, create this file, type this code. By the end you'll have built a small working app: a **website** (made with React) that talks to a **server** (made with Node.js), where you can keep a list of study tasks.

**Time needed: about 1.5–2 hours.** Try to do it in one sitting.

> [!IMPORTANT]
> **Please type all the code yourself. Don't copy and paste it.**
> We are studying how people type code, and CodeLapse records your typing. Pasted code would hide exactly what we want to learn.
>
> - **Typos are completely fine.** Fixing them is normal and useful data.
> - **Terminal commands** (the grey boxes marked "terminal") *can* be copy-pasted. They're not part of the study.

> [!NOTE]
> CodeLapse only records files inside the one folder you choose, and only on your computer. You decide at the end what to send us. See [What is recorded](README.md#what-is-recorded).

## Contents

| Part | What you do | Time |
|---|---|---|
| [1](#part-1-get-your-computer-ready) | Get your computer ready | 15 min |
| [2](#part-2-learn-a-few-vs-code-basics) | Learn a few VS Code basics | 5 min |
| [3](#part-3-create-your-project-folder-and-start-recording) | Create your project folder and start recording | 5 min |
| [4](#part-4-type-the-editor-settings-file) | Type the editor settings file | 5 min |
| [5](#part-5-build-the-server) | Build the server | 25–35 min |
| [6](#part-6-build-the-website) | Build the website | 30–45 min |
| [7](#part-7-finish-and-send-your-data) | Finish and send your data | 15 min |
| [Help](#if-something-goes-wrong) | If something goes wrong | — |

**Mac or Windows?** Keyboard shortcuts are written as **Mac / Windows**, for example **`Cmd+S` / `Ctrl+S`**.

---

## Part 1: Get your computer ready

### 1.1 Install VS Code

VS Code is the program you'll type code in. Download it from [code.visualstudio.com](https://code.visualstudio.com/), install it, and open it once.

### 1.2 Install Node.js

Node.js runs JavaScript code on your computer. Go to [nodejs.org](https://nodejs.org/), download the version marked **LTS**, and install it, clicking **Next / Continue** through every screen.

**Then quit VS Code completely and open it again**, so it notices Node.js.

### 1.3 Install CodeLapse

1. Download [**codelapse.vsix**](https://github.com/Shanthan2307/Codelapse_ext_testing/releases/latest/download/codelapse.vsix).
2. In VS Code, click the **Extensions** icon on the left side (four little squares).
3. At the top of the Extensions panel, click **`···`** and choose **Install from VSIX…**
4. Find the `codelapse.vsix` file you downloaded (usually in **Downloads**) and click **Install**.

### 1.4 Turn off AI helpers

If you have **GitHub Copilot** or any other AI coding assistant installed in VS Code, please turn it off for this test: in the **Extensions** panel, click it and choose **Disable**. (The settings file in Part 4 also switches off auto-complete for this project.)

---

## Part 2: Learn a few VS Code basics

You'll use these moves again and again. Have a quick look now.

| To do this | Do this |
|---|---|
| **See your files** | Click the **Explorer** icon (two pieces of paper) at the top-left. |
| **Create a file** | In the Explorer, hover over your project's name and click the **New File** icon (a page with a +). Type the name, press **Enter**. |
| **Save a file** | **`Cmd+S` / `Ctrl+S`**. A file with unsaved changes shows a **●** dot on its tab. |
| **Open a terminal** | Menu **Terminal → New Terminal**. It opens at the bottom. Commands are typed there, then **Enter**. |
| **Open a second terminal** | Click the **+** at the top-right of the terminal panel. |
| **Stop a program in a terminal** | Click inside that terminal and press **`Ctrl+C`** (on Mac too). |
| **Open the Command Palette** | **`Cmd+Shift+P` / `Ctrl+Shift+P`**, then type a command's name. |

> [!TIP]
> **About spaces at the start of lines:** VS Code adds them automatically when you press Enter. If your spaces don't match this guide exactly, **that's fine**: the code still works. Everything else (letters, capitals, brackets, commas, quotes) must match.

---

## Part 3: Create your project folder and start recording

1. On your **Desktop**, create a new folder named **`studyboard-yourname`** (with your own name, e.g. `studyboard-alex`).
   - **Mac:** right-click the Desktop → **New Folder**.
   - **Windows:** right-click the Desktop → **New → Folder**.
2. In VS Code, use the menu **File → Open Folder…**, select your `studyboard-yourname` folder, and click **Open**.
   - If VS Code asks *"Do you trust the authors of the files in this folder?"*, click **Yes, I trust the authors**.
3. A message from CodeLapse appears at the bottom-right: *"CodeLapse is not recording yet…"*. Click **Choose Folder**, then click **`studyboard-yourname`** in the list.
   - Missed the message? Click **CodeLapse: Choose folder** in the bottom bar of VS Code.
4. ✅ **Check:** the bottom bar of VS Code now says **`CodeLapse: studyboard-yourname`**. CodeLapse is recording.

---

## Part 4: Type the editor settings file

By default, VS Code types some characters for you: typing `{` also adds `}`, and pressing Enter can accept a word VS Code suggested. When you're copying code line by line, that creates extra characters and breaks the code. This file turns those features off, **for this project only**.

1. In the Explorer, hover over **STUDYBOARD-YOURNAME** and click the **New File** icon.
2. Type exactly **`.vscode/settings.json`** and press **Enter**. (The `/` creates a folder named `.vscode` with the file inside it.)
3. Type the code below into the file. **One special thing about this file:** the settings aren't switched on yet, so when you type the very first `{` and press **Enter**, VS Code adds the closing `}` by itself on a line below. That means **you stop after the line ending in `false`, and don't type the last `}`**: it's already there.
4. Save (**`Cmd+S` / `Ctrl+S`**).

<!-- file: .vscode/settings.json -->
```json
{
  "editor.autoClosingBrackets": "never",
  "editor.autoClosingQuotes": "never",
  "javascript.autoClosingTags": false,
  "editor.acceptSuggestionOnEnter": "off",
  "editor.quickSuggestions": { "other": false, "comments": false, "strings": false },
  "editor.suggestOnTriggerCharacters": false,
  "editor.inlineSuggest.enabled": false
}
```

✅ **Check:** the tab shows no **●** dot (it's saved), and the file ends with **exactly one** `}`. If you see two `}` at the end, delete one and save again. That extra `}` is exactly the kind of thing this file prevents from now on.

---

## Part 5: Build the server

The **server** stores your study tasks and hands them to the website.

### 5.1 Set up the server folder

Open a terminal (**Terminal → New Terminal**) and run these commands one at a time. Paste each line, press **Enter**, and wait for it to finish before the next:

<!-- terminal: server setup -->
```bash
mkdir server
cd server
npm init -y
npm install express
npm pkg set scripts.test="node --test"
```

✅ **Check:** in the Explorer there's now a **`server`** folder containing `package.json`, `package-lock.json` and `node_modules`. Keep this terminal open.

### 5.2 The task checker

This small file checks that a new task has a title.

Create the file **`server/validateTask.js`**: in the Explorer, hover over the **`server`** folder and click the **New File** icon (or create it from the project name and type `server/validateTask.js`). Type this, then save:

<!-- file: server/validateTask.js -->
```js
function validateTask(task) {
  if (!task.title) {
    return 'Title is required';
  }
  return null;
}

module.exports = validateTask;
```

### 5.3 Tests for the task checker

**Tests** are small programs that check other code works. Create **`server/validateTask.test.js`**, type this, then save:

<!-- file: server/validateTask.test.js -->
```js
const test = require('node:test');
const assert = require('node:assert');
const validateTask = require('./validateTask');

test('a task with a title is valid', () => {
  assert.strictEqual(validateTask({ title: 'Read chapter 3' }), null);
});

test('a task without a title is invalid', () => {
  assert.strictEqual(validateTask({}), 'Title is required');
});

test('a title with only spaces is invalid', () => {
  assert.strictEqual(validateTask({ title: '   ' }), 'Title is required');
});
```

### 5.4 Run the tests: one will fail on purpose

1. Use the menu **Terminal → Run Task…**
2. Choose **`npm: test - server`**. (If you first see a list of task types, choose **npm**, then **test - server**.)
3. If VS Code asks *"Select for which kind of errors and warnings to scan the task output"*, choose **Continue without scanning the task output**.

❌ **Expected:** in the output, look for the summary lines **`ℹ pass 2`** and **`ℹ fail 1`**, and a red **✖** next to *"a title with only spaces is invalid"*. Our checker doesn't notice a title made only of spaces. **That's on purpose!** CodeLapse marks this failure on your timeline.

> [!IMPORTANT]
> Always run tests with **Terminal → Run Task…**. Typing `npm test` into the terminal also works, but CodeLapse can't see the result.

### 5.5 Fix the bug

1. Open **`server/validateTask.js`**.
2. On **line 2**, click just after `task.title` (before the `)`), and type:

<!-- snippet: validateTask fix -->
```js
 || task.title.trim() === ''
```

Line 2 should now look like this:

<!-- snippet: validateTask fixed line -->
```js
  if (!task.title || task.title.trim() === '') {
```

3. Save, then run the tests again: **Terminal → Run Task… → `npm: test - server`**.

✅ **Expected:** three green **✔** ticks, and the summary lines **`ℹ pass 3`** and **`ℹ fail 0`**. You fixed a bug!

### 5.6 The server itself

Create **`server/index.js`**, type this, then save. It's the longest server file, so take your time:

<!-- file: server/index.js -->
```js
const express = require('express');
const validateTask = require('./validateTask');

const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const error = validateTask(req.body);
  if (error) {
    return res.status(400).json({ error: error });
  }
  const task = { id: nextId, title: req.body.title, done: false };
  nextId = nextId + 1;
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.done = !task.done;
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
```

### 5.7 Start the server

In your terminal (it's still inside the `server` folder), run:

<!-- terminal: start server -->
```bash
node --watch index.js
```

✅ **Check:** the terminal says **`Server running on http://localhost:3001`**. Now open your web browser and go to **http://localhost:3001/api/tasks**. You should see **`[]`**: an empty list of tasks.

**Leave this terminal running** for the rest of the guide. If you change a server file later, it restarts by itself.

---

## Part 6: Build the website

### 6.1 Create the React project

Open a **second terminal**: click the **+** at the top-right of the terminal panel. Run these commands one at a time:

<!-- terminal: client setup -->
```bash
npm create vite@9.2.1 client -- --template react --no-interactive
cd client
npm install
```

✅ **Check:** a **`client`** folder appeared in the Explorer, with a `src` folder inside it.

> [!NOTE]
> These commands created many files for you. In the next steps you'll **replace** the contents of three of them with code you type. To replace a file's contents: open it, press **`Cmd+A` / `Ctrl+A`** (select all), press **Delete**, then start typing.

### 6.2 Connect the website to the server

Open **`client/vite.config.js`**, replace everything in it with this, and save:

<!-- file: client/vite.config.js -->
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})
```

### 6.3 The website's look

Open **`client/src/App.css`**, replace everything in it with this, and save:

<!-- file: client/src/App.css -->
```css
.board {
  max-width: 480px;
  margin: 40px auto;
  font-family: sans-serif;
}

form {
  display: flex;
  gap: 8px;
}

form input {
  flex: 1;
  padding: 8px;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}

li span {
  flex: 1;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.error {
  color: red;
}
```

### 6.4 The website's code

This is the biggest file. Open **`client/src/App.jsx`**, replace everything in it with this, and save. Take breaks if you need to: CodeLapse will skip the pause in your replay.

<!-- file: client/src/App.jsx -->
```jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
  }, [])

  async function addTask(event) {
    event.preventDefault()
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error)
      return
    }
    setTasks([...tasks, data])
    setTitle('')
    setError('')
  }

  async function toggleTask(id) {
    const res = await fetch('/api/tasks/' + id, { method: 'PATCH' })
    const updated = await res.json()
    setTasks(tasks.map((t) => (t.id === id ? updated : t)))
  }

  async function deleteTask(id) {
    await fetch('/api/tasks/' + id, { method: 'DELETE' })
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <div className="board">
      <h1>StudyBoard</h1>
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to study?"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)}
            />
            <span className={task.done ? 'done' : ''}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

### 6.5 Start the website and try it

In your **second** terminal (inside the `client` folder), run:

<!-- terminal: start client -->
```bash
npm run dev
```

It prints an address like **`http://localhost:5173/`**. Open it in your web browser.

✅ **Try these:**
- [ ] Type a task like *"Read chapter 3"* and click **Add**. It appears in the list.
- [ ] Click **Add** with an empty box. A red **"Title is required"** appears.
- [ ] Tick a task's checkbox. It gets crossed out.
- [ ] Click **Delete**. The task disappears.

### 6.6 Add a "tasks left" counter

Your last change: show how many tasks are not done yet. Open **`client/src/App.jsx`** again.

**First change.** Find the line that says **`return (`** (around line 43). Click at the very start of that line and press **Enter** to make an empty line above it. Click on the empty line and type:

<!-- snippet: counter variable -->
```jsx
  const left = tasks.filter((t) => !t.done).length
```

**Second change.** Find the line that says **`</ul>`** (near the bottom). Click at the very end of that line, press **Enter**, and type:

<!-- snippet: counter paragraph -->
```jsx
      <p>Tasks left: {left}</p>
```

Save. ✅ **Check:** the website updates by itself and shows **"Tasks left: …"** under the list. Tick a box and watch the number change.

🎉 **You built a full-stack app!**

---

## Part 7: Finish and send your data

### 7.1 Stop the programs

Click inside each terminal and press **`Ctrl+C`**.

### 7.2 Stop recording and watch yourself code

1. Open the Command Palette (**`Cmd+Shift+P` / `Ctrl+Shift+P`**), type **`CodeLapse: Stop`**, and choose **CodeLapse: Stop Recording Session**.
2. Your report opens. Press **▶ Play** and watch your code being typed! Try the **10x** speed button, drag the timeline, and click the red **✕** and green **✓** marks from your test runs.

### 7.3 Save your data to a folder

1. Command Palette → type **`CodeLapse: Save`** → choose **CodeLapse: Save Session Data to Folder**.
2. A list of your sessions appears with the StudyBoard ones already ticked. Press **Enter**.
3. Choose your **Desktop** and click **Save Here**. A folder named `codelapse-data-studyboard-…` opens.
4. Turn it into a zip file:
   - **Mac:** right-click the folder → **Compress**
   - **Windows:** right-click the folder → **Send to → Compressed (zipped) folder**
5. Rename the zip file to **`yourname-codelapse-data.zip`**.

### 7.4 Send it and tell us what you think

- **Send your zip:** follow [step 6.3 of the main guide](README.md#63-send-it-choose-one) (Google Drive or GitHub).
- **Feedback form:** follow [step 7 of the main guide](README.md#7-fill-in-the-feedback-form). When it asks which guide you followed, choose **Beginner guide**.
- **Uninstall** when you're done: [step 8 of the main guide](README.md#8-uninstall-and-clean-up).

**Thank you!** 🙏

---

## If something goes wrong

<details>
<summary><b>A line has a red wavy underline</b></summary>

That usually means a typo on that line or the line just before it. Compare it carefully with this guide. Common ones:
- a missing `)`, `}`, `]`, `,` or `'`
- wrong capital letters: `useState` is not the same as `usestate`
- `=>` typed as `= >` (no space allowed in between)
</details>

<details>
<summary><b>The terminal says <code>command not found: npm</code> (or <code>node</code>)</b></summary>

Node.js isn't installed, or VS Code was open while you installed it. Install Node.js ([1.2](#12-install-nodejs)), then **quit VS Code completely** and open it again.
</details>

<details>
<summary><b>Windows: "running scripts is disabled on this system"</b></summary>

Click the small **˅** arrow next to the **+** in the terminal panel and choose **Command Prompt**. Run your commands in that new terminal instead. (Use `cd server` or `cd client` first if the step needs it.)
</details>

<details>
<summary><b>The terminal says <code>EADDRINUSE</code> or "address already in use"</b></summary>

The server is already running in another terminal. Close extra terminals with the **trash can** icon, then start it again in one terminal.
</details>

<details>
<summary><b>The website is blank or shows a red error box</b></summary>

There's a typo in a website file. The error message names the file and line number, e.g. `App.jsx:25`. Fix it and save; the page reloads by itself.
</details>

<details>
<summary><b>Tasks don't appear, or adding one does nothing</b></summary>

- Is the **server** still running in your first terminal? It should say `Server running on http://localhost:3001`. If not: `cd server` (if needed) and `node --watch index.js`.
- Check `client/vite.config.js` for typos, save it, then stop the website (`Ctrl+C`) and run `npm run dev` again.
</details>

<details>
<summary><b>I can't find <code>npm: test - server</code> in Run Task</b></summary>

Make sure you ran all the commands in [5.1](#51-set-up-the-server-folder), especially the last one (`npm pkg set …`). In the Run Task list, try choosing **npm** first. You can also type `test` to filter the list.
</details>

<details>
<summary><b>The bottom bar doesn't say "CodeLapse: studyboard-yourname"</b></summary>

Click whatever CodeLapse shows in the bottom bar, or open the Command Palette and run **CodeLapse: Choose Folder to Record**, then pick your `studyboard-yourname` folder.
</details>

Still stuck? Ask your test coordinator, or open a [🐞 Bug report](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=bug_report.yml).
