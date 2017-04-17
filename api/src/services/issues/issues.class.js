/* eslint-disable no-unused-vars */
const request = require('request-promise');
const logger = require('winston');

class Service {
  setup(app) {
    this.app = app;
  }

  find() {
    let issueTrackerConfig = this.app.get('issueTracker');

    let requestOptions = {
      uri: `${issueTrackerConfig.baseUrl}/rest/api/2/search?jql=${issueTrackerConfig.filter}`,
      json: true,
      transform: this.getResponseTransformer(issueTrackerConfig.type)
    };

    if (issueTrackerConfig.auth && issueTrackerConfig.auth.type !== 'none') {
      requestOptions.auth = issueTrackerConfig.auth;
    }

    logger.info('Requesting issues from', requestOptions.uri);

    return request(requestOptions);
  }

  /** Gets a transformer which transforms the reponse from the issue tracker to the common format. */
  getResponseTransformer(issueTrackerType) {
    if (issueTrackerType === 'jira') {
      return function(body) {
        return body.issues.map(issue => ({
          key: issue.key,
          title: issue.fields ? issue.fields.summary : null,
          type: issue.fields && issue.fields.issuetype ? issue.fields.issuetype.name : null,
          status: issue.fields && issue.fields.resolution ? issue.fields.resolution.name : null,
          description: issue.fields ? issue.fields.description : null,
          created: issue.fields ? issue.fields.created : null,
          updated: issue.fields ? issue.fields.updated : null
        }));
      }
    }
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
