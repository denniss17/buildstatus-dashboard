var ip = require('ip');

class Service {
  constructor (options) {
    this.options = options || {};
  }

  find () {
    return Promise.resolve({
      ipAddress: ip.address()
    });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
