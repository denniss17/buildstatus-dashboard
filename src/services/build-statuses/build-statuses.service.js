// Initializes the `buildStatuses` service on path `/build-statuses`
const createService = require('feathers-nedb');
const createModel = require('../../models/build-statuses.model');
const hooks = require('./build-statuses.hooks');
const filters = require('./build-statuses.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'build-statuses',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/build-statuses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('build-statuses');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
