import React, { Component } from 'react';
import IssueProvider from './IssueProvider';
import PropTypes from 'prop-types';

class IssueProviderList extends Component {
  render() {
    const { issueProviders, statusesForIssues } = this.props;
    return (
      <div>
        {issueProviders && Object.keys(issueProviders).map(id => <IssueProvider key={id}
                                                                                issueProvider={issueProviders[id]}
                                                                                statusesForIssues={statusesForIssues}/>)}
      </div>
    );
  }
}

IssueProviderList.propTypes = {
  issueProviders: PropTypes.object,
  statusesForIssues: PropTypes.object
};

export default IssueProviderList;
