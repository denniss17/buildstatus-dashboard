import React, { Component } from 'react';
import './App.css';

class IssueList extends Component {
  renderIssue(issue) {
    return (
      <div className="col-2">
        <div className="card card-inverse card-outline-secondary issue-card mt-3">
          <div className="card-block">
            <h4 className="card-title">{issue.key}</h4>
            <h6 className="card-subtitle">{issue.title}</h6>
          </div>
          <div className="card-footer text-muted">
            {issue.type} {issue.status}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        {this.props.issues.map(this.renderIssue)}
      </div>
    )
  }
}

export default IssueList;
