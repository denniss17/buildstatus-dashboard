const assert = require('assert');
const app = require('../../src/app');

describe('\'buildStatuses\' service', () => {
  it('registered the service', () => {
    const service = app.service('build-statuses');

    assert.ok(service, 'Registered the service');
  });
});
