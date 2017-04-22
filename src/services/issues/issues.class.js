const logger = require('winston');

class Service {
  constructor (options) {
    this.options = options || {};
    this.loadIssuesService();
  }

  loadIssuesService() {
    if(!this.options.type){
      throw new Error('No issues configuration found. Please configure the issues service.')
    }

    logger.info(`Loading issues service of type '${this.options.type}'`);

    const serviceName = `issues-${this.options.type}`;
    const createService = require(`../${serviceName}/${serviceName}.class`);

    this.issuesService = createService(this.options);
  }

  setup(app) {
    this.app = app;
    this.issuesService.setup(this.app);
  }

  find() {
    // Simply redirect to the specific issue service
    return this.issuesService.find();
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
