const request = require('request-promise');
const logger = require('winston');

class JiraIssueCollector {
  constructor(app) {
    this.app = app;
  }

  collect() {
    return this.request();
  }

  /**
   * Perform the request to the Jira instance based on the configuration
   * @returns {Promise} A promise which resolves with the list of issue.
   */
  request() {
    let issueTrackerConfig = this.app.get('issueTracker');

    let requestOptions = {
      uri: `${issueTrackerConfig.baseUrl}/rest/api/2/search?jql=${issueTrackerConfig.filter}`,
      json: true,
      transform: this.transform
    };

    if (issueTrackerConfig.auth && issueTrackerConfig.auth.type !== 'none') {
      requestOptions.auth = issueTrackerConfig.auth;
    }

    logger.info('Requesting issues from', requestOptions.uri);

    return request(requestOptions);
  }

  /**
   * Transforms the response body to an array of normalized issues.
   * @param body The body of the response from jira.
   * @returns {Array} An array containing the normalized issues.
   */
  transform(body) {
    return body.issues.map(issue => ({
      key: issue.key,
      link: null,
      origin: 'jira',
      title: issue.fields ? issue.fields.summary : null,
      type: issue.fields && issue.fields.issuetype ? issue.fields.issuetype.name : null,
      status: issue.fields && issue.fields.resolution ? issue.fields.resolution.name : null,
      description: issue.fields ? issue.fields.description : null,
      created: issue.fields ? issue.fields.created : null,
      updated: issue.fields ? issue.fields.updated : null
    }));
  }
}

module.exports = JiraIssueCollector;
