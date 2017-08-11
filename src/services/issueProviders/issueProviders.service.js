const createService = require('./issueProviders.class');

module.exports = function () {
  const app = this;
  const config = app.get('issues');
  const options = Object.assign({ name: 'issueProviders' }, config);

  app.use('/issueProviders', createService(options));
  app.service('issueProviders');
};
