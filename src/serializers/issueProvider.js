class IssueProviderSerializer {
  serialize(provider, id) {
    return {
      id,
      type: provider.options.type,
      title: provider.options.title || null
    };
  }
}

module.exports = function() {
  return new IssueProviderSerializer();
};
