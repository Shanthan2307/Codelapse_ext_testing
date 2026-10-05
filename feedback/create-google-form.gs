/**
 * Creates the "CodeLapse Tester Feedback" Google Form, plus a Google Sheet that
 * collects its responses, in the Google account that runs it.
 *
 * How to use:
 *   1. Go to https://script.google.com and click "New project".
 *   2. Delete the sample code, paste this whole file, and click Save.
 *   3. Pick "createCodeLapseFeedbackForm" in the toolbar and click Run.
 *      Google asks you to authorize access to Forms and Sheets: allow it.
 *   4. Open "Execution log": it prints the link to share with testers, the
 *      link to edit the form, and the responses spreadsheet.
 *
 * Running it again creates a second, separate form.
 */
function createCodeLapseFeedbackForm() {
  var form = FormApp.create('CodeLapse Tester Feedback');
  form
    .setDescription(
      'Thanks for testing CodeLapse! This takes about 10 minutes. ' +
        'Please use the same name you used on your session data zip file, so we can match your feedback to your data.'
    )
    .setProgressBar(true)
    .setAllowResponseEdits(true);

  var ratingColumns = ['1 – Poor', '2', '3', '4', '5 – Great', "Didn't try"];

  // ---------------------------------------------------------------- About you
  form.addSectionHeaderItem().setTitle('About you');

  form
    .addTextItem()
    .setTitle('Your name or alias')
    .setHelpText('The same name as on your <yourname>-codelapse-data.zip file.')
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('What best describes you?')
    .setChoiceValues([
      'High school student',
      'Undergraduate student',
      'Graduate student',
      'Bootcamp / course student',
      'Self-taught learner',
      'Professional developer'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('How long have you been programming?')
    .setChoiceValues(['Less than 1 year', '1–2 years', '3–5 years', 'More than 5 years'])
    .setRequired(true);

  form
    .addGridItem()
    .setTitle('Your experience before this test')
    .setRows(['React', 'Node.js / Express', 'VS Code'])
    .setColumns(['None', 'Beginner', 'Intermediate', 'Advanced'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Operating system')
    .setChoiceValues(['macOS', 'Windows', 'Linux'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Editor you tested in')
    .setChoiceValues(['VS Code', 'VS Code Insiders', 'Cursor'])
    .showOtherOption(true)
    .setRequired(true);

  // ------------------------------------------------------------------- Setup
  form.addPageBreakItem().setTitle('Setup');

  form
    .addScaleItem()
    .setTitle('How easy was it to install CodeLapse?')
    .setBounds(1, 5)
    .setLabels('Very hard', 'Very easy')
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Was it always clear which folder CodeLapse was recording?')
    .setChoiceValues(['Yes, always', 'Mostly', 'No, I was unsure'])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('Any problems installing it or choosing the folder?')
    .setHelpText('Leave empty if everything went smoothly.');

  // ------------------------------------------------------------- The session
  form.addPageBreakItem().setTitle('Building StudyBoard');

  form
    .addMultipleChoiceItem()
    .setTitle('Roughly how long did you code with CodeLapse recording?')
    .setChoiceValues(['Under 30 minutes', '30–60 minutes', '60–90 minutes', 'Over 90 minutes'])
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('How far did you get with StudyBoard?')
    .setChoiceValues(['Finished everything', 'Mostly finished', 'About half', 'Just started'])
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle('Besides your own typing, what did you use while coding?')
    .setHelpText('Tick all that apply. This is not judged; it helps us understand the recordings.')
    .setChoiceValues([
      'Official documentation',
      'Search engine / Stack Overflow',
      'Chat AI (ChatGPT, Claude, Gemini, …)',
      'AI autocomplete in the editor (Copilot, Cursor Tab, …)',
      'Code from an earlier project of mine',
      'Nothing else'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Did you run your tests through Terminal → Run Task?')
    .setChoiceValues(['Yes', 'I tried but it did not work', 'No, I skipped the tests', 'No, I typed npm test instead'])
    .setRequired(true);

  form
    .addScaleItem()
    .setTitle('Did recording ever get in your way (slowness, pop-ups, distraction)?')
    .setBounds(1, 5)
    .setLabels('Not at all', 'A lot')
    .setRequired(true);

  // ------------------------------------------------------- Replay and report
  form.addPageBreakItem().setTitle('Your replay and report');

  form
    .addGridItem()
    .setTitle('Rate each part of the report')
    .setRows([
      'Timelapse replay (typing animation)',
      'Speed controls and Skip idle',
      'Timeline test markers (✓ / ✕)',
      'Activity chart',
      'Top metrics (duration, keystrokes, lines)',
      'Commit / PR / standup summary',
      'Exported HTML report'
    ])
    .setColumns(ratingColumns)
    .setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('Did the replay match what you actually did?')
    .setChoiceValues(['Yes', 'Mostly', 'No'])
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('If anything in the replay looked wrong, what was it?')
    .setHelpText('E.g. missing code, wrong file, garbled text, test results missing. Roughly when in the session?');

  form.addTextItem().setTitle('Most useful part of CodeLapse');
  form.addTextItem().setTitle('Least useful part of CodeLapse');

  // ------------------------------------------------------------------- Value
  form.addPageBreakItem().setTitle('Would you use it?');

  form
    .addScaleItem()
    .setTitle('Would you use CodeLapse for your own coursework or projects?')
    .setBounds(1, 5)
    .setLabels('Never', 'Definitely')
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle('Who would you share a replay with?')
    .setChoiceValues([
      'Instructor / TA',
      'Classmates or study group',
      'Recruiters or in a portfolio',
      'Teammates during code review',
      'Only myself, to reflect',
      'Nobody'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form
    .addScaleItem()
    .setTitle('How comfortable are you with your coding being recorded (stored only on your computer)?')
    .setBounds(1, 5)
    .setLabels('Very uncomfortable', 'Very comfortable')
    .setRequired(true);

  form.addParagraphTextItem().setTitle('What would make you more comfortable being recorded?');

  form
    .addScaleItem()
    .setTitle('How likely are you to recommend CodeLapse to a fellow student?')
    .setBounds(0, 10)
    .setLabels('Not at all likely', 'Extremely likely')
    .setRequired(true);

  form.addParagraphTextItem().setTitle('One feature you wish CodeLapse had');

  form.addParagraphTextItem().setTitle('Any bugs, crashes or strange behavior you noticed?');

  // ---------------------------------------------------------------- Wrap-up
  form.addPageBreakItem().setTitle('Wrap-up');

  form
    .addMultipleChoiceItem()
    .setTitle('How did you send your session data?')
    .setChoiceValues(['Google Drive', 'GitHub issue', 'I could not send it'])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('Email, if we may contact you for a short follow-up (optional)')
    .setValidation(FormApp.createTextValidation().requireTextIsEmail().build());

  form.addParagraphTextItem().setTitle('Anything else you want to tell us?');

  // --------------------------------------------------- Responses spreadsheet
  var sheet = SpreadsheetApp.create('CodeLapse Tester Feedback (Responses)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  Logger.log('Share this link with testers: ' + form.getPublishedUrl());
  Logger.log('Edit the form:               ' + form.getEditUrl());
  Logger.log('Responses spreadsheet:       ' + sheet.getUrl());
}
