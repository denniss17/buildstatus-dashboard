import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import Home from '../Home';
import { findIssueProvidersWithStatus } from '../../actions/issueProviders';
import { getInfo } from '../../actions/info';

import './index.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  componentDidMount() {
    this.tick();
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  tick() {
    this.props.getInfo();
    this.props.findIssueProvidersWithStatus();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <div className="status-dashboard">
          <Home/>
        </div>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  findIssueProvidersWithStatus: PropTypes.func,
  getInfo: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    findIssueProvidersWithStatus: () => {
      dispatch(findIssueProvidersWithStatus());
    },
    getInfo: () => {
      dispatch(getInfo());
    }
  };
};

export default connect(() => ({}), mapDispatchToProps)(App);
