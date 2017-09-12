import React, { Component } from 'react';
import Issue from './Issue';
import PropTypes from 'prop-types';

class IssueList extends Component {
  render() {
    return (
      <div className="row pb-2">
        {this.props.issues && this.props.issues.map(issue => (issue && <Issue issue={issue} status={this.props.statusesForIssues[issue.key]} key={issue.key}/>))}
      </div>
    );
  }
}

IssueList.propTypes = {
  issues: PropTypes.array,
  statusesForIssues: PropTypes.object
};

export default IssueList;
