import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Issue.css';

class Issue extends Component {
  cardStyle() {
    let status = this.props.status;
    let isCached = status && status.cached;

    let styleClass = isCached ? 'card-cached' : '';

    if (status) {
      switch (status.result) {
        case 'SUCCESS':
          return `${styleClass} bg-success text-light`;
        case 'RUNNING':
          return `${styleClass} bg-info text-light`;
        case 'FAILURE':
          return `${styleClass} bg-warning text-light`;
        case 'ERROR':
          return `${styleClass} bg-danger text-light`;
        case 'UNKNOWN':
          return `${styleClass} bg-dark text-muted`;
        default:
          return `${styleClass} bg-dark text-danger`;
      }
    }
    return `${styleClass} bg-dark text-danger`;
  }

  render() {
    let issue = this.props.issue;
    let status = this.props.status;
    return (
      <div className="col-xl-2 col-lg-4 col-sm-8 col-16" key={issue.key}>
        <div className={'card card-inverse issue-card mt-2 ' + this.cardStyle()}>
          <div className="card-body">
            <h4 className="card-title text-center">
              <a href={issue ? issue.link : null} rel="noopener noreferrer" target="_blank">{issue.key}</a>
            </h4>
            <h6 className="card-subtitle text-center" title={issue.title}>
              <a href={status ? status.link : null} rel="noopener noreferrer" target="_blank">{issue.title}</a>
            </h6>
            {false && issue && issue.link && <a href={issue.link} className="card-link text-light" target="_blank">Issue</a>}
            {false && status && status.link && <a href={status.link} className="card-link text-light" target="_blank">Status</a>}
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
