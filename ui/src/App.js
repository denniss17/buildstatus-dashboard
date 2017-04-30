import React, {Component} from 'react';
import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import request from 'request';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import IssueList from './issues/IssueList';

const baseIssue = {
  key: null,
  link: null,
  origin: null,
  title: null,
  type: null,
  state: null,
  description: null,
  created: null,
  updated: null
};

class App extends Component {
  constructor(props) {
    super(props);

    // Setup default state
    this.state = {
      config: {
        serverUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3030' : `${window.location.protocol}//${window.location.host}`
      },
      issues: []
    };

    // Setup feather app
    this.app = feathers().configure(rest(this.state.config.serverUrl).request(request));

    // Bind methods
    this.fetchIssues = this.fetchIssues.bind(this);
    this.fetchStatuses = this.fetchStatuses.bind(this);
    this.updateStatusOfIssues = this.updateStatusOfIssues.bind(this);
  }

  componentDidMount() {
    this.fetchIssues().then(this.fetchStatuses);
  }

  fetchIssues() {
    const issueService = this.app.service('issues');
    return issueService.find().then(issues => {
      this.setState({issues, });
      return issues;
    }).catch(error => {
      console.log(error);
    });
  }

  fetchStatuses(issues) {
    const statusesService = this.app.service('statuses');
    return statusesService.find().then(this.updateStatusOfIssues);
  }

  updateStatusOfIssues(statuses) {
    statuses.forEach(status => {
      this.setState(prevState => {
        let issue = prevState.issues.find(i => i.key === status.issue);
        if(issue){
          issue.status = status;
        }
        return { issues: prevState.issues };
      })
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
