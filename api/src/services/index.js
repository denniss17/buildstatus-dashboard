'use strict';

const issues = require('./issues/issues.service.js');

module.exports = function () {
  const app = this;
  app.configure(issues);
};
