import React, {Component} from 'react';

import IssueList from 'components/IssueList/IssueList';

class Home extends Component {
  render() {
    return (
      <IssueList issues={this.props.issues}/>
    );
  }
}

export default Home;
