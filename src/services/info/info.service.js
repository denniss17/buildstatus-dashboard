const createService = require('./info.class.js');

module.exports = function () {
  const app = this;
  const options = { name: 'info' };

  app.use('/info', createService(options));
  app.service('info');
};
