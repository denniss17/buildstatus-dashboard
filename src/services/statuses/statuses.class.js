const logger = require('winston');
const errors = require('feathers-errors');

class Service {
  constructor (options) {
    this.options = options || {};
    this.loadBuildStatusesService();
  }

  loadBuildStatusesService () {
    if(!this.options.type){
      throw new Error('No status configuration found. Please configure the statuses service.')
    }
    logger.info(`Loading statuses service of type '${this.options.type}'`);

    const serviceName = `statuses-${this.options.type}`;
    const createService = require(`../${serviceName}/${serviceName}.class`);

    this.buildStatusesService = createService(this.options);
  }

  setup(app) {
    this.app = app;
    if(typeof this.buildStatusesService.setup === 'function'){
      this.buildStatusesService.setup(this.app);
    }
  }

  get(issueKey) {
    return this.buildStatusesService.get(issueKey).catch(error => new errors.NotFound('Status could not be determined for this issue'));
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
