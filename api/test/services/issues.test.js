'use strict';

const assert = require('assert');
const app = require('../../src/app');

describe('\'Issues\' service', () => {
  it('registered the service', () => {
    const service = app.service('issues');

    assert.ok(service, 'Registered the service');
  });
});
