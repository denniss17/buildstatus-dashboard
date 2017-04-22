'use strict';

const issues = require('./issues/issues.service.js');

const statuses = require('./statuses/statuses.service.js');

module.exports = function () {
  const app = this;
  app.configure(issues);
  app.configure(statuses);
};
