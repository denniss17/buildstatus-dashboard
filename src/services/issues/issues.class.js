class Service {
  setup(app){
    this.app = app;

    let issueTrackerConfig = this.app.get('issueTracker');
    const Collector = require(`../../collectors/issues.${issueTrackerConfig.type}`);

    this.collector = new Collector(app);
  }

  find () {
    return this.collector.collect()
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
