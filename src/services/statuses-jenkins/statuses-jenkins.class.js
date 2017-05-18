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
      transform: body => this.transform(issueKey, body)
    };

    if (this.options.auth && this.options.auth.type !== 'none') {
      requestOptions.auth = this.options.auth;
    }

    logger.info('Requesting status from', requestOptions.uri);

    return request(requestOptions);
  }

  /**
   * Transforms the response body to a normalized status
   * @param issueKey The key of the issue the received status is for.
   * @param body The body of the response from Jenkins.
   * @returns {Array} An array containing the normalized status.
   */
  transform(issueKey, body) {
    let lastBuild = body.builds[0];

    let result = Status.StatusResult.UNKNOWN;

    if(lastBuild){
      if(lastBuild.building){
        result = Status.StatusResult.RUNNING;
      }else if(lastBuild.result === 'SUCCESS'){
        result = Status.StatusResult.SUCCESS;
      }else if(lastBuild.result === 'UNSTABLE'){
        result = Status.StatusResult.FAILURE;
      }else if(lastBuild.result === 'FAILURE'){
        result = Status.StatusResult.FAILURE;
      }else{
        // Status is not known but job exists -> running
        result = Status.StatusResult.RUNNING;
      }
    }

    return new Status({
      issueKey,
      buildNumber: lastBuild ? lastBuild.id : null,
      link: lastBuild ? lastBuild.url : null,
      origin: 'jenkins',
      result,
      timestamp: lastBuild ? lastBuild.timestamp : null,
    });
  }
}

module.exports = function (options) {
  return new JenkinsStatusesService(options);
};

module.exports.Service = JenkinsStatusesService;
