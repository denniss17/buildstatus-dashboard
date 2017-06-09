import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-inverse bg-inverse">
        <div>
          <span className="navbar-text">{this.props.issues && this.props.issues.length} issues</span>
          <a className="navbar-brand float-right mr-2 text-muted" href="https://github.com/denniss17/status-dashboard" rel="noopener noreferrer" target="_blank">
            <i className="fa fa-github"/>
          </a>
        </div>
      </nav>
    );
  }
}


Footer.propTypes = {
  issues: PropTypes.array,
};

const mapStateToProps = (state) => ({ issues: state.issues });

export default connect(mapStateToProps)(Footer);
