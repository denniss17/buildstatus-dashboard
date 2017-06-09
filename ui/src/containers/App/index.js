import React, { Component } from 'react';

import Footer from '../../components/Footer';
import Home from '../Home';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  constructor(props) {
    super(props);
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

export default App;
