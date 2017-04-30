/**
 * Basic issue object, containing null values for all properties.
 */
const defaultIssue = {
  key: null,
  link: null,
  origin: null,
  title: null,
  type: null,
  state: null,
  description: null,
  created: null,
  updated: null
};

module.exports = function(attributes){
  return Object.assign({}, defaultIssue, attributes);
};
