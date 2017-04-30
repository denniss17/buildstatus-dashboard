import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar fixed-bottom navbar-inverse bg-inverse">
        <div class="container">
          <span className="navbar-text">{this.props.issues.length} issues</span>
          <a className="navbar-brand float-right mr-2 text-muted" href="https://github.com/denniss17/status-dashboard" target="_blank">
            <i className="fa fa-github"></i>
          </a>
        </div>
      </nav>
    )
  }
}

export default Footer;
