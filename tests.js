const assert = require('assert/strict');
const issuecheck = require('./issuecheck.js');

const tests = {
  testNoneContains: () => {
    assert.throws(() => {
        issuecheck.findIssue("ENG-", "title", "description", "branch");
      },
      RegExp("Issue not found")
    );
  },
  testTitle: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "feat: ENG-1234 Something of value",
      "description",
      "branch"
    );
    assert.equal(issue, "ENG-1234");
  },
  testTitleAtEnd: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "feat: ENG-1234",
      "description",
      "branch"
    );
    assert.equal(issue, "ENG-1234");
  },
  testDescription: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "title",
      `some
      multi
      line
      Fixes ENG-1234
      something else`,
      "branch"
    );
    assert.equal(issue, "ENG-1234");
  },
  testDescriptionOnly: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "title",
      "ENG-1234",
      "branch"
    );
    assert.equal(issue, "ENG-1234");
  },
  testBranch: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "title",
      "description",
      "user/eng-1234"
    );
    assert.equal(issue, "ENG-1234");
  },
  testBranchWithTitle: () => {
    const issue = issuecheck.findIssue(
      "ENG-",
      "title",
      "description",
      "user/eng-1234-doing-something-cool"
    );
    assert.equal(issue, "ENG-1234");
  },
};

function run() {
  for (const [key, test] of Object.entries(tests)) {
    try {
      test()
      console.log(`${key} passed`)
    } catch(error) {
      console.log(`${key} failed: ${error}`)
    }
  }
};

run();