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

  static statusIsTooRecent(status) {
    return status && status.updatedAt > (new Date() - 50000);
  }

  updateStatusInDb(status) {
    status.updatedAt = new Date().getTime();
    this.db.update({ issueKey: status.issueKey }, status, { upsert: true });
  }

  get(issueKey) {
    return new Promise(resolve => {
      // Find existing status
      this.db.findOne({ issueKey }, (err, existingStatus) => {
        // If existing is within interval: use cached
        if(Service.statusIsTooRecent(existingStatus)) {
          logger.debug('Too recent:', existingStatus);
          resolve(existingStatus);
          return;
        }

        // Request new status
        this.statusesService.get(issueKey).then(status => {
          this.updateStatusInDb(status);
          resolve(status);
        }).catch(() => {
          // No status available from provider
          if (existingStatus) {
            // Old status is in the cache: use this one
            logger.debug('Status not available, returning status from cache:', existingStatus);
            this.updateStatusInDb(existingStatus);
            existingStatus.cached = (existingStatus.result !== Status.StatusResult.UNKNOWN);
            resolve(existingStatus);
          } else {
            // No status in the cache: remember that there is no status
            let status = new Status({
              issueKey,
              origin: 'system',
              result: Status.StatusResult.UNKNOWN,
              timestamp: new Date(),
            });
            this.updateStatusInDb(status);
            resolve(status);
          }
        });
      });
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
