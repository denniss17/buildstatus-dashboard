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
    // To avoid the database to grow very large: compact it every 15 minutes
    this.db.persistence.setAutocompactionInterval(15 * 60000);
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
      // Find existing status
      this.db.findOne({ issueKey }, (err, existingStatus) => {
        // If existing is within interval: use cached
        if (existingStatus && existingStatus.updatedAt > (new Date() - 50000)) {
          resolve(existingStatus);
        }

        // Request new status
        this.statusesService.get(issueKey).then(status => {
          // Insert or update ("upsert") the status in the cache
          status.updatedAt = new Date().getTime();
          this.db.update({ issueKey }, status, { upsert: true });
          resolve(status);
        }).catch(() => {
          // See if we have the status in the cache
          if (existingStatus) {
            logger.info('Status not available, returning status from cache:', existingStatus);
            existingStatus.cached = true;
          }

          resolve(existingStatus || new Status({
            issueKey,
            origin: 'system',
            result: Status.StatusResult.UNKNOWN,
            timestamp: new Date()
          }));
        });
      });
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
