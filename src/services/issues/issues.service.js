const createService = require('./issues.class.js');

module.exports = function () {
  const app = this;
  const config = app.get('issues');
  const options = Object.assign({ name: 'issues' }, config);

  app.use('/issues', createService(options));
  app.service('issues');
};
