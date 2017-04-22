import React, { Component } from 'react';

class IssueList extends Component {
  constructor() {
    super();
    this.renderIssue = this.renderIssue.bind(this);
  }

  renderIssue(issue) {
    return (
      <div className="col-2" key={issue.key}>
        <div className={"card card-inverse issue-card mt-3 " + this.cardStyle(issue)}>
          <div className="card-block">
            <h4 className="card-title">{issue.key}</h4>
            <h6 className="card-subtitle">{issue.title}</h6>
          </div>
          <div className="card-footer text-muted">
            {issue.type} {issue.state}
          </div>
        </div>
      </div>
    );
  }

  cardStyle(issue) {
    if (issue.status) {
      switch(issue.status.result){
        case 'SUCCESS':
          return 'card-success';
        case 'RUNNING':
          return 'card-info';
        case 'ERROR':
          return 'card-danger';
      }
    }
    return "card-outline-secondary";
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
