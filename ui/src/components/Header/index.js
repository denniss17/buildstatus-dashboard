import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../../logo.ico';
import './index.css';

class Header extends Component {
  render() {
    let issueCount = 0;
    if (this.props.issueProviders) {
      Object.keys(this.props.issueProviders).forEach(id => {
        let issueProvider = this.props.issueProviders[id];
        if (issueProvider.issues) {
          issueCount += issueProvider.issues.length;
        }
      });
    }

    return (
      <nav className="header navbar navbar-dark fixed-top bg-dark">
        <span className="navbar-brand">
          <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
          Status
        </span>
        <span className="navbar-text">IP: {this.props.info && this.props.info.ipAddress}</span>
        <span className="navbar-text">{issueCount} Issues</span>
        <a className="navbar-text float-right mr-2 text-muted" href="https://github.com/denniss17/status-dashboard"
           rel="noopener noreferrer" target="_blank">
          <i className="fa fa-github"/>
        </a>
      </nav>
    );
  }
}


Header.propTypes = {
  issueProviders: PropTypes.object,
  statusesForIssues: PropTypes.object,
  info: PropTypes.object,
};

const mapStateToProps = (state) => ({
  issueProviders: state.issueProviders,
  statusesForIssues: state.statusesForIssues,
  info: state.info
});

export default connect(mapStateToProps)(Header);
