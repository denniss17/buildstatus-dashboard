import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from '../../components/Footer';
import Home from '../Home';
import { getIssuesWithStatus } from '../../actions/issues';
import { getInfo } from '../../actions/info';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
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
    this.props.getIssuesWithStatus();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div>
        <div className="container-fluid status-dashboard">
          <Home/>
        </div>
        <Footer/>
      </div>
    );
  }
}

App.propTypes = {
  getIssuesWithStatus: PropTypes.func,
  getInfo: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    getIssuesWithStatus: () => {
      dispatch(getIssuesWithStatus());
    },
    getInfo: () => {
      dispatch(getInfo());
    }
  };
};

export default connect(() => {}, mapDispatchToProps)(App);
