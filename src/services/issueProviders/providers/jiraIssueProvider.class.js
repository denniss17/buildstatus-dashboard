const logger = require('winston');
const request = require('request-promise');
const Issue = require('../../../models/issue');

/**
 * Issue provider which requests issues from a Jira server based on a search query.
 */
class JiraIssueProvider {
  constructor (options) {
    this.options = options || {};
  }

  // noinspection JSUnusedGlobalSymbols
  find () {
    return this.request();
  }

  /**
   * Perform the request to the Jira instance based on the configuration
   * @returns {Promise} A promise which resolves with the list of issue.
   */
  request() {
    let requestOptions = {
      uri: `${this.options.baseUrl}/rest/api/2/search?maxResults=200&jql=${this.options.filter}`,
      json: true,
      transform: this.transform,
      auth: this.options.auth
    };

    logger.info('JiraIssueProvider: Requesting issues from', requestOptions.uri);

    return request(requestOptions);
  }

  /**
   * Transforms the response body to an array of normalized issues.
   * @param body The body of the response from jira.
   * @returns {Array} An array containing the normalized issues.
   */
  transform(body) {
    return body.issues && body.issues.map(issue => new Issue({
      key: issue.key,
      link: issue.self,
      origin: 'jira',
      title: issue.fields ? issue.fields.summary : null,
      type: issue.fields && issue.fields.issuetype ? issue.fields.issuetype.name : null,
      state: issue.fields && issue.fields.resolution ? issue.fields.resolution.name : null,
      created: issue.fields ? issue.fields.created : null,
      updated: issue.fields ? issue.fields.updated : null
    }));
  }
}

module.exports = function (options) {
  return new JiraIssueProvider(options);
};

module.exports.Service = JiraIssueProvider;
