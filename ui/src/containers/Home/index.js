import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import IssueList from '../../components/IssueList';

class Home extends Component {
  render() {
    return (
      <IssueList issues={this.props.issues} statusesForIssues={this.props.statusesForIssues}/>
    );
  }
}

Home.propTypes = {
  issues: PropTypes.array,
  statusesForIssues: PropTypes.object
};

const mapStateToProps = (state) => ({ issues: state.issues, statusesForIssues: state.statusesForIssues });

export default connect(mapStateToProps)(Home);
