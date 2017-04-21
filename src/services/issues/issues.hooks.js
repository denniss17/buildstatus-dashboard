const Collector = require('../../collectors/issues.jira');

let lastUpdate = 0;

module.exports = {
  before: {
    all: [],
    find: [ hook => {
      let now = new Date().getTime();
      if(now - lastUpdate > 3000) {
        lastUpdate = now;
        let collector = new Collector(hook.app);
        collector.collect();
      }
    }],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
