import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIssuesWithStatus } from '../../actions/issues';

import IssueList from '../../components/IssueList';

class Home extends Component {
  componentDidMount() {
    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  tick() {
    this.props.getIssuesWithStatus();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <IssueList issues={this.props.issues} statusesForIssues={this.props.statusesForIssues}/>
    );
  }
}

Home.propTypes = {
  issues: PropTypes.array,
  statusesForIssues: PropTypes.object,
  getIssuesWithStatus: PropTypes.func
};

const mapStateToProps = (state) => ({ issues: state.issues, statusesForIssues: state.statusesForIssues });
const mapDispatchToProps = (dispatch) => {
  return {
    getIssuesWithStatus: () => {
      dispatch(getIssuesWithStatus());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
