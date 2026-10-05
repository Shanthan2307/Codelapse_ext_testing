# Tester feedback form

Testers fill in one short form (about 10 minutes, 29 questions) after their session. It is designed to be matched with their session data by **name**, and to separate what they *did* (time spent, tools used, tests run) from what they *thought* (ratings, comfort, wishes).

## Option 1: Create it automatically in Google Forms (2 minutes)

[`create-google-form.gs`](create-google-form.gs) builds the complete form, plus a Google Sheet that collects every response.

1. Go to [script.google.com](https://script.google.com) and click **New project**.
2. Delete the sample code, paste the whole contents of [`create-google-form.gs`](create-google-form.gs), and click **Save**.
3. In the toolbar, make sure **`createCodeLapseFeedbackForm`** is selected, then click **Run**.
4. Google asks you to authorize access to Forms and Sheets. Allow it (it is your own script, running in your own account).
5. Open **Execution log**. It prints three links:
   - **Share this link with testers**: paste it into the main [README](../README.md#7-fill-in-the-feedback-form), replacing the "link coming soon" line.
   - **Edit the form**: to tweak questions or settings.
   - **Responses spreadsheet**: where answers arrive.

> [!TIP]
> In the form's **Settings**, consider turning off "Collect email addresses" and "Limit to 1 response" if your testers don't all have Google accounts.

## Option 2: Build it by hand (Google Forms, Microsoft Forms, Typeform, …)

Use the question list below. It is generated from the script, so both options give the same form.

## Questions

### About you

1. **Your name or alias** *(required)* — Short answer
   <br>*Help text: The same name as on your &lt;yourname&gt;-codelapse-data.zip file.*
2. **What best describes you?** *(required)* — Multiple choice<br>High school student · Undergraduate student · Graduate student · Bootcamp / course student · Self-taught learner · Professional developer · Other…
3. **How long have you been programming?** *(required)* — Multiple choice<br>Less than 1 year · 1–2 years · 3–5 years · More than 5 years
4. **Your experience before this test** *(required)* — Multiple-choice grid<br>Rows: React · Node.js / Express · VS Code<br>Columns: None · Beginner · Intermediate · Advanced
5. **Operating system** *(required)* — Multiple choice<br>macOS · Windows · Linux
6. **Editor you tested in** *(required)* — Multiple choice<br>VS Code · VS Code Insiders · Cursor · Other…

### Setup

7. **How easy was it to install CodeLapse?** *(required)* — Linear scale<br>1 (Very hard) → 5 (Very easy)
8. **Was it always clear which folder CodeLapse was recording?** *(required)* — Multiple choice<br>Yes, always · Mostly · No, I was unsure
9. **Any problems installing it or choosing the folder?** — Paragraph
   <br>*Help text: Leave empty if everything went smoothly.*

### Building StudyBoard

10. **Roughly how long did you code with CodeLapse recording?** *(required)* — Multiple choice<br>Under 30 minutes · 30–60 minutes · 60–90 minutes · Over 90 minutes
11. **How far did you get with StudyBoard?** *(required)* — Multiple choice<br>Finished everything · Mostly finished · About half · Just started
12. **Besides your own typing, what did you use while coding?** *(required)* — Checkboxes<br>Official documentation · Search engine / Stack Overflow · Chat AI (ChatGPT, Claude, Gemini, …) · AI autocomplete in the editor (Copilot, Cursor Tab, …) · Code from an earlier project of mine · Nothing else · Other…
   <br>*Help text: Tick all that apply. This is not judged; it helps us understand the recordings.*
13. **Did you run your tests through Terminal → Run Task?** *(required)* — Multiple choice<br>Yes · I tried but it did not work · No, I skipped the tests · No, I typed npm test instead
14. **Did recording ever get in your way (slowness, pop-ups, distraction)?** *(required)* — Linear scale<br>1 (Not at all) → 5 (A lot)

### Your replay and report

15. **Rate each part of the report** *(required)* — Multiple-choice grid<br>Rows: Timelapse replay (typing animation) · Speed controls and Skip idle · Timeline test markers (✓ / ✕) · Activity chart · Top metrics (duration, keystrokes, lines) · Commit / PR / standup summary · Exported HTML report<br>Columns: 1 – Poor · 2 · 3 · 4 · 5 – Great · Didn't try
16. **Did the replay match what you actually did?** *(required)* — Multiple choice<br>Yes · Mostly · No
17. **If anything in the replay looked wrong, what was it?** — Paragraph
   <br>*Help text: E.g. missing code, wrong file, garbled text, test results missing. Roughly when in the session?*
18. **Most useful part of CodeLapse** — Short answer
19. **Least useful part of CodeLapse** — Short answer

### Would you use it?

20. **Would you use CodeLapse for your own coursework or projects?** *(required)* — Linear scale<br>1 (Never) → 5 (Definitely)
21. **Who would you share a replay with?** *(required)* — Checkboxes<br>Instructor / TA · Classmates or study group · Recruiters or in a portfolio · Teammates during code review · Only myself, to reflect · Nobody · Other…
22. **How comfortable are you with your coding being recorded (stored only on your computer)?** *(required)* — Linear scale<br>1 (Very uncomfortable) → 5 (Very comfortable)
23. **What would make you more comfortable being recorded?** — Paragraph
24. **How likely are you to recommend CodeLapse to a fellow student?** *(required)* — Linear scale<br>0 (Not at all likely) → 10 (Extremely likely)
25. **One feature you wish CodeLapse had** — Paragraph
26. **Any bugs, crashes or strange behavior you noticed?** — Paragraph

### Wrap-up

27. **How did you send your session data?** *(required)* — Multiple choice<br>Google Drive · GitHub issue · I could not send it
28. **Email, if we may contact you for a short follow-up (optional)** — Short answer<br>Must be a valid email address
29. **Anything else you want to tell us?** — Paragraph

## Other feedback channels

- **Bug reports:** the [🐞 Bug report](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=bug_report.yml) issue form, at any time during testing.
- **Session data:** Google Drive, or the [📦 Session data submission](https://github.com/Shanthan2307/Codelapse_ext_testing/issues/new?template=session_data.yml) issue form (see the main README, step 6).
- **A follow-up chat:** the form's last questions ask whether a tester is happy to be contacted. A 15-minute call where they talk through their replay usually surfaces things a form can't.
