import React, { Component } from 'react';
import Issue from './Issue';

class IssueList extends Component {
  render() {
    return (
      <div className="row">
        {this.props.issues.map(issue => (<Issue issue={issue} />))}
      </div>
    )
  }
}

export default IssueList;
