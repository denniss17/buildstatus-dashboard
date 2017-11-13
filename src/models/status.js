/**
 * Basic status object, containing null for all properties.
 */
const defaultStatus = {
  issueKey: null,
  buildNumber: null,
  link: null,
  origin: null,
  result: null,
  timestamp: null, // Timestamp of status from provider
  updatedAt: null, // Timestamp of time this status was retrieved from provider
  cached: false
};

const StatusResult = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  ERROR: 'ERROR',
  RUNNING: 'RUNNING',
  UNKNOWN: 'UNKNOWN',
};

module.exports = function(attributes){
  return Object.assign({}, defaultStatus, attributes);
};

module.exports.StatusResult = StatusResult;
