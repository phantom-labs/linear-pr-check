module.exports = {
  findIssue: (prefix, title, description, branch) => {
    const titleRegex = RegExp(`(${prefix}\\d{1,}) ?`);
    const branchRegex = RegExp(`(${prefix.toLowerCase()}\\d{1,})-?`);

    if (titleRegex.test(title)) {
      return title.match(titleRegex)[1];
    } else if (titleRegex.test(description)) {
      return description.match(titleRegex)[1];
    } else if (branchRegex.test(branch)) {
      return branch.match(branchRegex)[1].toUpperCase();
    }

    return;
  }
}