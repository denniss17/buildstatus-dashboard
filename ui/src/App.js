import React, { Component } from 'react';
import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import request from 'request';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import IssueList from './IssueList';

class App extends Component {
  constructor(props) {
    super(props);

    // Setup default state
    this.state = {
      config: {
        serverUrl: process.env.NODE_ENV === 'production' ? `https://buildstatus-dashboard.herokuapp.com` : 'http://localhost:3030'
      },
      issues: []
    };

    // Setup feather app
    this.app = feathers().configure(rest(this.state.config.serverUrl).request(request));

    // Bind methods
    this.fetchIssues = this.fetchIssues.bind(this);
  }

  componentDidMount() {
    this.fetchIssues();
  }

  fetchIssues() {
    const issueService = this.app.service('issues');
    issueService.find().then(issues => {
      this.setState({ issues });
    });
  }

  render() {
    return (
      <div className="status-dashboard">
        <div className="container-fluid">
          <IssueList issues={this.state.issues}/>
        </div>
        <nav className="navbar fixed-bottom navbar-inverse bg-inverse">
          <span className="navbar-text">Number of issues: {this.state.issues.length}</span>
        </nav>
      </div>
    );
  }
}

export default App;
