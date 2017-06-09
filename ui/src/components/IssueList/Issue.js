import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Issue.css';

class Issue extends Component {
  cardStyle() {
    let status = this.props.status;

    if (status) {
      switch (status.result) {
        case 'SUCCESS':
          return 'card-success';
        case 'RUNNING':
          return 'card-info';
        case 'FAILURE':
          return 'card-warning';
        case 'ERROR':
          return 'card-danger';
        case 'UNKNOWN':
          return 'card-outline-secondary';
        default:
          return 'card-outline-danger';
      }
    }
    return 'card-outline-danger';
  }

  render() {
    let issue = this.props.issue;
    let status = this.props.status;
    return (
      <div className="col-lg-2 col-md-3 col-sm-6 col-12" key={issue.key}>
        <div className={'card card-inverse issue-card mt-3 ' + this.cardStyle()}>
          <div className="card-block">
            <h4 className="card-title"><a href={status ? status.link : null} rel="noopener noreferrer" target="_blank">{issue.key}</a>
            </h4>
            <h6 className="card-subtitle">{issue.title}</h6>
          </div>
        </div>
      </div>
    );
  }
}

Issue.propTypes = {
  status: PropTypes.object,
  issue: PropTypes.object
};

export default Issue;
