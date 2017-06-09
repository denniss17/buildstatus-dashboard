import React, {Component} from 'react';
import feathers from 'feathers/client';
import rest from 'feathers-rest/client';
import request from 'request';

import Footer from 'Footer'
import Home from 'containers/Home';

import 'App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

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
    this.tick = this.tick.bind(this);
    this.updateStatusOfIssue = this.updateStatusOfIssue.bind(this);
  }

  componentDidMount() {
    this.fetchIssues().then(this.fetchStatuses);
    this.timerID = setInterval(
      () => this.tick(),
      60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.fetchIssues().then(this.fetchStatuses);
  }

  fetchIssues() {
    const issueService = this.app.service('issues');
    return issueService.find().then(issues => {
      this.setState({issues});
      return issues;
    }).catch(error => {
      console.log(error);
    });
  }

  fetchStatuses(issues) {
    const statusesService = this.app.service('statuses');
    return issues.map(issue => statusesService.get(issue.key).then(this.updateStatusOfIssue));
  }

  updateStatusOfIssue(status) {
    this.setState(prevState => {
      let issue = prevState.issues.find(i => i.key === status.issueKey);
      if (issue) {
        issue.status = status;
      }
      return {issues: prevState.issues};
    });
    return status;
  }

  render() {
    return (
      <div>
        <div className="container-fluid status-dashboard">
          <Home issues={this.state.issues}/>
        </div>
        <Footer issues={this.state.issues}/>
      </div>
    );
  }
}

export default App;
