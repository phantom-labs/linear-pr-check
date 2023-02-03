const core = require("@actions/core");

module.exports = {
  find: (prefix, title) => {
    const titleRegex = RegExp(`(^${prefix}.*$)`);
    if (titleRegex.test(title)) {
      return prefix;
    }
  },
};
