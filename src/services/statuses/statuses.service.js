const createService = require('./statuses.class.js');

module.exports = function () {
  const app = this;
  const config = app.get('statuses');
  const options = Object.assign({ name: 'statuses' }, config);

  app.use('/statuses', createService(options));
  app.service('statuses');
};
