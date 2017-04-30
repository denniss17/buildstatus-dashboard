const logger = require('winston');
const request = require('request-promise');
const Status = require('../../models/status');

class JenkinsStatusesService {
  constructor (options) {
    this.options = options || {};
  }

  setup(app) {
    this.app = app;
  }

  get(issueKey) {
    return this.request(issueKey);
  }

  /**
   * Perform the request to the Jenkins instance based on the configuration in order to retreive the status of an issue.
   * @param issueKey The key of the issue to get the status for
   * @returns {Promise} A promise which resolves with the current status for the issue.
   */
  request(issueKey) {
    let requestOptions = {
      uri: `${this.options.baseUrl}/job/${this.options.jobNameTemplate.replace('{key}', issueKey)}/api/json?tree=builds[number,url,timestamp,id,building,result]`,
      json: true,
      transform: this.transform
    };

    if (this.options.auth && this.options.auth.type !== 'none') {
      requestOptions.auth = this.options.auth;
    }

    logger.info('Requesting status from', requestOptions.uri);

    return request(requestOptions);
  }

  /**
   * Transforms the response body to a normalized status
   * @param body The body of the response from Jenkins.
   * @returns {Array} An array containing the normalized status.
   */
  transform(body) {
    // TODO transform status
    return new Status(body);
  }
}

module.exports = function (options) {
  return new JenkinsStatusesService(options);
};

module.exports.Service = JenkinsStatusesService;
