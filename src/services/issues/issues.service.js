'use strict';

// Initializes the `Issues` service on path `/issues`
const createService = require('./issues.class.js');
const hooks = require('./issues.hooks');
const filters = require('./issues.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'issues',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/issues', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('issues');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
