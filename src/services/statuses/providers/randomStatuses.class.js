const logger = require('winston');
const Status = require('../../../models/status');

const statusResults = [Status.StatusResult.SUCCESS, Status.StatusResult.FAILURE, Status.StatusResult.RUNNING, Status.StatusResult.UNKNOWN];

class RandomStatusesService {
  constructor(options){
    this.options = options || {};
  }

  get(issueKey) {
    return Promise.resolve(this.generateRandomStatus(issueKey));
  }

  generateRandomStatus(issueKey) {
    logger.info('Generating a random status for issue', issueKey);
    return new Status({
      issueKey,
      result: statusResults[Math.floor(Math.random() * statusResults.length)],
      origin: 'random'
    });
  }
}

module.exports = function(options) {
  return new RandomStatusesService(options);
};

module.exports.Service = RandomStatusesService;
