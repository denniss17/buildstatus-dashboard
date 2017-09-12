const logger = require('winston');
const Status = require('../../models/status');

class Service {
  constructor(options) {
    this.options = options || {};
    this.loadStatusesService();
  }

  loadStatusesService() {
    if (!this.options.type) {
      throw new Error('No status configuration found. Please configure the statuses service.');
    }
    const serviceName = `${this.options.type}Statuses`;
    logger.info(`Loading statuses of type '${this.options.type}' (service name: '${serviceName}')`);

    const createService = require(`./providers/${serviceName}.class`);
    this.statusesService = createService(this.options);
  }

  // noinspection JSUnusedGlobalSymbols
  setup(app) {
    this.app = app;
    if (typeof this.statusesService.setup === 'function') {
      this.statusesService.setup(this.app);
    }
  }

  get(issueKey) {
    return this.statusesService.get(issueKey).catch(() => {
      return new Status({
        issueKey,
        origin: 'system',
        result: Status.StatusResult.UNKNOWN,
        timestamp: new Date()
      });
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
