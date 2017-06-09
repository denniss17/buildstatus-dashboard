import React, {Component} from 'react';

class Issue extends Component {
  cardStyle() {
    let statuses = this.props.statuses;

    if (statuses && statuses[0])  {
      switch (statuses[0].result) {
        case 'SUCCESS':
          return 'card-success';
        case 'RUNNING':
          return 'card-info';
        case 'FAILURE':
          return 'card-warning';
        case 'ERROR':
          return 'card-danger';
      }
    }
    return "card-outline-secondary";
  }

  render() {
    let issue = this.props.issue;
    return (
      <div className="col-lg-2 col-md-3 col-sm-6 col-12" key={issue.key}>
        <div className={"card card-inverse issue-card mt-3 " + this.cardStyle()}>
          <div className="card-block">
            <h4 className="card-title"><a href={issue.status ? issue.status.link : null} target="_blank">{issue.key}</a>
            </h4>
            <h6 className="card-subtitle">{issue.title}</h6>
          </div>
        </div>
      </div>
    )
  }
}

export default Issue;
