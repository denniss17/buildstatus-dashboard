/**
 * Basic status object, containing null for all properties.
 */
const defaultStatus = {
  issueKey: null,
  buildNumber: null,
  link: null,
  origin: null,
  result: null,
  timestamp: null
};

const StatusResult = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
  RUNNING: 'RUNNING',
  UNKNOWN: 'UNKNOWN',
};

module.exports = function(attributes){
  return Object.assign({}, defaultStatus, attributes);
};

module.exports.StatusResult = StatusResult;
