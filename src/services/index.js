'use strict';

const buildStatuses = require('./build-statuses/build-statuses.service.js');

const issues = require('./issues/issues.service.js');

module.exports = function () {
  const app = this;
  app.configure(buildStatuses);
  app.configure(issues);
};
