const assert = require('assert/strict');
const issuecheck = require('./issuecheck.js');
const exceptioncheck = require('./exceptioncheck.ts');

const tests = {
  testNoneContains: () => {
    const issue = issuecheck.findIssue("ENG-", "title", "description", "branch");
    assert.equal(issue, undefined);
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
  testTitlePrefixException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "nit: ENG-1234 Something of value",
    );
    assert.equal(exception, "nit");
  },
  testTitlePrefixNoException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "feat: ENG-1234 Something of value",
    );
    assert.equal(exception, undefined);
  },
  testTitlePrefixWithParenthesesNoException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "feat(somefeature): ENG-1234 Something of value",
    );
    assert.equal(exception, undefined);
  },
  testTitlePrefixWithParenthesesException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "nit(somefeature): ENG-1234 Something of value",
    );
    assert.equal(exception, "nit");
  },
  testTitlePrefixWithBracketsNoException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "feat[somefeature]: ENG-1234 Something of value",
    );
    assert.equal(exception, undefined);
  },
  testTitlePrefixWithBracketsException: () => {
    const exception = exceptioncheck.find(
      "nit",
      "nit[somefeature]: ENG-1234 Something of value",
    );
    assert.equal(exception, "nit");
  },
};

function run() {
  for (const [key, test] of Object.entries(tests)) {
    try {
      test()
      console.log(`${key} passed`)
    } catch (error) {
      console.log(`${key} failed: ${error}`)
    }
  }
};

run();