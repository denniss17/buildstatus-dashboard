import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IssueProviderList from '../../components/IssueProviderList';

class Home extends Component {
  render() {
    return (
      <IssueProviderList issueProviders={this.props.issueProviders} statusesForIssues={this.props.statusesForIssues}/>
    );
  }
}

Home.propTypes = {
  issueProviders: PropTypes.object,
  statusesForIssues: PropTypes.object
};

const mapStateToProps = (state) => ({ issueProviders: state.issueProviders, statusesForIssues: state.statusesForIssues });

export default connect(mapStateToProps)(Home);
