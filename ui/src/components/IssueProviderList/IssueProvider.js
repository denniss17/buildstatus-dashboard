import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IssueList from '../IssueList';

import './IssueProvider.css';

class IssueProvider extends Component {
  render() {
    let issueProvider = this.props.issueProvider;
    return (
      <div className="content-wrapper">
        <div className="sidebar-left">
          {issueProvider.title &&
          <h1 className="issueProvider-title">
            {issueProvider.title}
          </h1>}
        </div>
        <div className="main">
          <div className="container-fluid">
            <IssueList issues={issueProvider.issues} statusesForIssues={this.props.statusesForIssues}/>
          </div>
        </div>
      </div>
    );
  }
}

IssueProvider.propTypes = {
  issueProvider: PropTypes.object,
  statusesForIssues: PropTypes.object,
};

export default IssueProvider;
