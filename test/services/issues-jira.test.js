const assert = require('assert');
const app = require('../../src/app');

describe('\'issues.jira\' service', () => {
  it('registered the service', () => {
    const service = app.service('issues-jira');

    assert.ok(service, 'Registered the service');
  });
});
