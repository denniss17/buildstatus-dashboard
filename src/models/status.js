/**
 * Basic status object, containing null for all properties.
 */
const defaultStatus = {
  issueKey: null,
  link: null,
  origin: null,
  result: null,
  timestamp: null
};

const StatusResult = {
  SUCCESS: 'success',
  FAILURE: 'failure',
  RUNNING: 'running',
  UNKNOWN: 'unknown',
};

module.exports = function(attributes){
  return Object.assign({}, defaultStatus, attributes);
};

module.exports.StatusResult = StatusResult;
