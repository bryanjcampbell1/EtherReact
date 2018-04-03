import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button } from 'react-bootstrap';
import './App.css';
import Web3 from 'web3';
import logo from './ether4.png';
import genKey from './generateKeys.png';
import metaMask from './metamask.png';
import win from './winningWallet.png';
import impAcc from './importAccount.png';
import Tools from './Tools';


const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var abiData = [
  {
    "constant": true,
    "inputs": [],
    "name": "getName",
    "outputs": [
      {
        "name": "winnerName_",
        "type": "bytes32"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "buyIn",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "yourName",
        "type": "bytes32"
      }
    ],
    "name": "setName",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
];

var ethVal = 100000000000000000;
var gasVal = 25000;
var gasPrice = 40000000000;

var ethHex = '0x' + ethVal.toString(16);
var gasHex = '0x' + gasVal.toString(16);
var gpHex = '0x' + gasPrice.toString(16);

var contractAddress = "0x65601fcf248988bb79e1358d77edcc649f7a548a";

var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

class Example extends React.Component {
  render() {
    return (
      <div style={{padding: "20px" }}>
        <h1>Example Quiz</h1>

        <h3>Step 1: Download the Metamask Chrome Extension and Sign In</h3>
        <h6>Make sure to transfer Ether to your account</h6>
        <Well className="text-center" style={{width: '95%', }}>
          <img src={metaMask} alt="metaMask" style={{maxWidth: '20%'}}/>
        </Well>

          <h3>Step 2: Register for the Game </h3>
          <h6>To register, navigate to the sart contract and send the Buy In Amount.</h6>


          <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
            <Well className="text-center" style={{width: '95%', }}>
              <p>Status: Registration Active (Game Live!)</p>
              <p>Buy In Amount: 0.01 ETH </p>
              <Button bsStyle="primary"> Buy In! </Button>
              <p>Smart Contract Address: 0xfb35ad702e715e61a3f362c62da7c1bd235102fc </p>
              <p>Winning Wallet Address: 0x28944f7d5b83d073988994bd57dfee21be39cb7b </p>
            </Well>
        </div>
            <h3>Step 3: Solve the Puzzle </h3>
            <h6>Puzzle description added when game goes live.  Rush to solve it first!</h6>

          <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
            <Well className="text-center" style={{width: '95%', }}>
              <p>Status: Registration Active (Game Live!)</p>
              <p>Buy In Amount: 0.01 ETH </p>
              <Button bsStyle="primary"> Buy In! </Button>
              <p>Smart Contract Address: 0xfb35ad702e715e61a3f362c62da7c1bd235102fc </p>
              <p>Winning Wallet Address: 0x28944f7d5b83d073988994bd57dfee21be39cb7b </p>
              <p>Assign the numbers 1 through 26 to the letters a through z </p>
              <p>Find 2 US Presidents who’s first name letters add to the same number </p>
              <p>Take those 2 first names and combine them </p>
              <p>Delete any letter which shows up more than once </p>
              <p>Scramble the remaining letters and use them to obtain a word that would receive the highest Scrabble score</p>
              <p>You do not need to use all the remaining letters</p>
              <p>Use Tools page to generate the private key of the wallet that unlocks this puzzle’s smart contract.</p>
            </Well>
          </div>
            <h3>Solution</h3>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
              <Well className="text-center" style={{width: '95%', }}>
            <h3>Grover = 7 + 18 + 15 + 22 + 5 + 18 = 85</h3>
            <h3>Franklin = 6 + 18 + 1 + 14 + 11 + 12 + 9 + 14 = 85</h3>
            <h3>govefankli</h3>
            <h3>fanglike</h3>
              </Well>
            </div>
            <h3>Step 4: Get the Keys </h3>
            <h6>Paste your solution into the text field on the Tools page to derive the public and private keys </h6>
            <Well className="text-center" style={{width: '95%', }}>
              <img src={genKey} alt="genKey" style={{maxWidth: '95%'}}/>
            </Well>
            <h3>Step 3: Claim Your Ether! </h3>
            <h6>Enter the Winning Wallet using the private key derived in Step 3</h6>
            <img src={impAcc} alt="impAcc" style={{maxWidth: '50%'}}/>
            <img src={win} alt="win" style={{maxWidth: '50%'}}/>
            <h6>Call the contract function named payout and enter your personal wallet public addess so you can collect your prize!</h6>
            <img src={logo} alt="logo" style={{maxWidth: '50%'}}/>
            <h6>Make sure to use the same wallet address that you used when you registered for the game.</h6>
            <h6>Funds will be distributed when the next block is mined. </h6>

      </div>
    );
  }
}

class QuizObject extends Component {
  saySomething(something) {
      console.log(something);
  }

  handleClick(e) {

    web3.eth.getAccounts(function(error, result) {
        if(error != null)
            console.log("Couldnt get accounts");

       simpleContract.methods.buyIn().send({
                               from: result[0],
                                gas: gasHex,
                           gasPrice: gpHex,
                              value: ethHex
                           }, function(error, result){
                               if(!error)
                                   console.log(JSON.stringify(result));
                               else
                                   console.error(error);
                           });

    });
  }

  componentDidMount() {
      this.saySomething("component did mount");
  }

  render() {
    return (
      <div className="QuizObject" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
      <Well className="text-center" style={{width: '95%', }}>
        <p>Status: Registration Active (Game Live!)</p>
        <p>Buy In Amount: 0.01 ETH </p>
        <Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Buy In! </Button>
        <p>Smart Contract Address: 0xfb35ad702e715e61a3f362c62da7c1bd235102fc </p>
        <p>Winning Wallet Address: 0x28944f7d5b83d073988994bd57dfee21be39cb7b </p>
        <p>Assign the numbers 1 through 26 to the letters a through z </p>
        <p>Find 2 US Presidents who’s first name letters add to the same number </p>
        <p>Take those 2 first names and combine them </p>
        <p>Delete any letter which shows up more than once </p>
        <p>Scramble the remaining letters and use them to obtain a word that would receive the highest Scrabble score</p>
        <p>You do not need to use all the remaining letters</p>
        <p>Use SHA(256) on this word to derive the private key of the wallet that unlocks this puzzle’s smart contract.</p>
      </Well>
      </div>

    );
  }
}

class Banner extends React.Component {
  render() {
    return (
      <div style={{ height: '10%' }}>
        <img src={logo} alt="logo" style={{maxWidth: '100%'}}/>
      </div>
    );
  }
}

function AllTogether(props) {
  const pagenumber = props.page;
  if (pagenumber == 1) {
    return <div>
            <Banner />
            <QuizObject />
          </div>;
  }
  else if (pagenumber == 2) {
    return <div>
            <Example />
          </div>;
  }
  else {
    return <div>
            <Tools />
          </div>;
  }

}

const divStyle = {
  box1: {
  color: 'blue',
  height: '10%',
  background: 'red',
  border: 2,
  },
};


class Navigation extends React.Component{
  constructor(props) {
    super(props);
    this.state = {page: 1};
  }

  handleSelect(eventKey){
    console.log(eventKey);
    if (eventKey === 1) {
      this.setState({
        page: 1
      });
    }
    else if (eventKey === 2) {
      this.setState({
        page: 2
      });
    }
    else {
      this.setState({
        page: 3
      });
    }

  };

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">EtherQuiz.io</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav onSelect={this.handleSelect.bind(this)}>
            <NavItem eventKey={1}>Home</NavItem>
            <NavItem eventKey={2}>Example</NavItem>
            <NavItem eventKey={3}>Tools</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
         <AllTogether page={this.state.page}/>
         </div>
    );
  }
}

class App extends Component {

  render() {
    return (
        <div>
          <Navigation/>
        </div>
    );
  }
}

export default App;
