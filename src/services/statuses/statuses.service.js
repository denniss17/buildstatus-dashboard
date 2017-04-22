// Initializes the `build-statuses` service on path `/build-statuses`
const createService = require('./statuses.class.js');
const hooks = require('./statuses.hooks');
const filters = require('./statuses.filters');

module.exports = function () {
  const app = this;
  const config = app.get('statuses');
  const options = Object.assign({ name: 'statuses' }, config);

  // Initialize our service with any options it requires
  app.use('/statuses', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('statuses');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
