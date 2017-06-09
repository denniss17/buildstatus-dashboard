const logger = require('winston');
const Issue = require('../../models/issue');

class Service {
  constructor(options) {
    this.options = options || {};
    this.loadIssuesService();
  }

  loadIssuesService() {
    if (!this.options.type) {
      throw new Error('No issues configuration found. Please configure the issues service.');
    }

    logger.info(`Loading issues service of type '${this.options.type}'`);

    const serviceName = `issues-${this.options.type}`;
    const createService = require(`../${serviceName}/${serviceName}.class`);

    this.issuesService = createService(this.options);
  }

  setup(app) {
    this.app = app;
    if (typeof this.issuesService.setup === 'function') {
      this.issuesService.setup(this.app);
    }
  }

  find() {
    // Simply redirect to the specific issue service
    return this.issuesService.find().then(issues => {
      if (this.options.fixed) {
        this.options.fixed.forEach(issueKey => {
          issues.unshift(
            new Issue({
              key: issueKey,
              origin: 'fixed',
            })
          );
        });
      }
      return issues;
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
