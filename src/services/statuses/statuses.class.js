const logger = require('winston');
const Datastore = require('nedb')
const Status = require('../../models/status');

class Service {
  constructor(options) {
    this.options = options || {};
    this.db = null;
    this.loadStatusesService();
    this.loadDatabase();
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

  loadDatabase() {
    this.db = new Datastore({ filename: 'cache/statuses', autoload: true });
  }

  // noinspection JSUnusedGlobalSymbols
  setup(app) {
    this.app = app;
    if (typeof this.statusesService.setup === 'function') {
      this.statusesService.setup(this.app);
    }
  }

  get(issueKey) {
    return new Promise(resolve => {
      this.statusesService.get(issueKey).then(status => {
        // Insert or update ("upsert") the status in the cache
        this.db.update({ issueKey }, status, { upsert: true });
        resolve(status);
      }).catch(() => {
        // See if we have the status in the cache
        this.db.findOne({ issueKey }, function(err, status) {
          status && logger.info('Loaded status from cache:', status);
          resolve(status || new Status({
            issueKey,
            origin: 'system',
            result: Status.StatusResult.UNKNOWN,
            timestamp: new Date()
          }));
        });
      })
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
