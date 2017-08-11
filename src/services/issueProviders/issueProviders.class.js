const logger = require('winston');
const errors = require('feathers-errors');

class Service {
  constructor(options) {
    this.options = options || {};
    this.providers = [];
    this.loadIssueProviders();
  }

  loadIssueProviders() {
    if (!this.options.providers) {
      throw new Error('No issue providers found. Please configure the issue providers.');
    }

    this.options.providers.forEach(providerOptions => {
      const serviceName = `${providerOptions.type}IssueProvider`;
      logger.info(`Loading issue provider of type '${providerOptions.type}' (service name: '${serviceName}')`);
      const createService = require(`./providers/${serviceName}.class`);
      this.providers.push(createService(providerOptions));
    });
  }

  // noinspection JSUnusedGlobalSymbols
  setup(app) {
    this.app = app;
    // Setup issue providers if required
    this.providers.filter(provider => typeof provider.setup === 'function').forEach(provider => provider.setup(this.app));
  }

  serializeProvider(provider, index){
    return {
      id: index,
      type: provider.options.type,
      title: provider.options.title
    };
  }

  // noinspection JSUnusedGlobalSymbols
  find() {
    // Return a list of providers
    return Promise.resolve(this.providers.map(this.serializeProvider));
  }

  get(id) {
    const provider = this.providers[id];
    if(provider) {
      // Simply redirect to the specific issue provider
      return provider.find().then(issues => {
        return Object.assign({ issues }, this.serializeProvider(provider, parseInt(id)));
      });
    } else {
      return new errors.NotFound('Issue provider does not exist');
    }
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
