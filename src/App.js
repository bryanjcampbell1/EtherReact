import React, { Component } from 'react';
import './App.css';

import Navigation from './Navigation';
import TestingElement from './TestingElement';

class App extends Component {

  render() {
    return (
        <div>
          <Navigation/>
          <TestingElement/>
        </div>
    );
  }
}

export default App;
