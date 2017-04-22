const logger = require('winston');

class Service {
  setup(app){
    this.app = app;

    // Load issue tracker
    let issuesConfig = this.app.get('issues');
    logger.info(`Loading issue tracker of type ${issuesConfig.type}`);

    const serviceName = `issues-${issuesConfig.type}`;
    const createService = require(`../${serviceName}/${serviceName}.class`);

    this.issuesService = createService(issuesConfig);
    this.issuesService.setup(this.app);
  }

  find () {
    // Simply redirect to the specific issue service
    return this.issuesService.find()
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
