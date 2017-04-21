const request = require('request-promise');
const logger = require('winston');

module.exports = function(app) {
  return new JiraIssueCollector(app);
};

class JiraIssueCollector {
  constructor(app) {
    this.app = app;
  }

  collect() {
    this.request().then(issues => {
      console.log(issues);
    });
  }

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
