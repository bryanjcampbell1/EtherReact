import React, { Component } from 'react';
import './App.css';

import Navigation from './Navigation';
import TestingElement from './TestingElement';


var QuizObject = {
    contractAddress: "0x44a1947efdd72eda8d0052a91f18dfd4f22565a2",
    winningAddress: '0x28944f7d5B83D073988994bd57DfEe21Be39Cb7B',
    description:"hello world"
};

var contractAddress = QuizObject.contractAddress;
var winningAddress = QuizObject.winningAddress;

class App extends Component {

  render() {
    return (
        <div>
          <Navigation/>
          <TestingElement winningAddress={winningAddress} contractAddress={contractAddress}/>
        </div>
    );
  }
}

export default App;
