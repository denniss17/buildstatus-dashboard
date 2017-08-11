const Issue = require('../../../models/issue');

/**
 * Issue provider which provides a fixed set of issues.
 */
class FixedIssueProvider {
  constructor(options) {
    this.options = options || {};
  }

  // noinspection JSUnusedGlobalSymbols
  find() {
    // For each defined issueKey, return an issue
    if (this.options.issues) {
      return Promise.resolve(this.options.issues.map(key => new Issue({ key, origin: 'fixed' })));
    } else {
      return Promise.resolve([]);
    }
  }
}

module.exports = function (options) {
  return new FixedIssueProvider(options);
};

module.exports.Service = FixedIssueProvider;
