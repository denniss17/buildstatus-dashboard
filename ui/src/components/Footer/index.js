import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-inverse bg-inverse">
        <div className="row">
          <div className="col">
            <span className="navbar-text">IP: {this.props.info && this.props.info.ipAddress}</span>
          </div>
          <div className="col">
            <div className="text-center">
              <span className="navbar-text">{this.props.issues && this.props.issues.length} issues</span>
            </div>
          </div>
          <div className="col">
            <a className="navbar-brand float-right mr-2 text-muted" href="https://github.com/denniss17/status-dashboard" rel="noopener noreferrer" target="_blank">
              <i className="fa fa-github"/>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}


Footer.propTypes = {
  issues: PropTypes.array,
  info: PropTypes.object,
};

const mapStateToProps = (state) => ({ issues: state.issues, info: state.info });

export default connect(mapStateToProps)(Footer);
