import React, { Component } from 'react';
import Navigation from './Navigation';
import Web3 from 'web3';

var $ = require('jquery');

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
var abiData = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "answer",
				"type": "address"
			}
		],
		"name": "addAnswer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "allowRefund",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"name": "payTo",
				"type": "address"
			}
		],
		"name": "payout",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "playerRefund",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "hashedAnswer",
				"type": "address"
			}
		],
		"name": "addNewWinningAddress",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "player",
				"type": "address"
			}
		],
		"name": "addPlayer",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getGameNumber",
		"outputs": [
			{
				"name": "gameNumber_",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getWinnerAddress",
		"outputs": [
			{
				"name": "winnerAddress_",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
var contractAddress = "0x44a1947efdd72eda8d0052a91f18dfd4f22565a2";
var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

class App extends Component {
  constructor(props) {
    super(props);
		//default value just looks better
    this.state = {winningAddress: "0xa496e724234a2Bf52776be7f4A11a7F691226dD2"};

  }

	componentWillMount(){
	  simpleContract.methods.getWinnerAddress().call((error, result) => {
	    this.otherFunction(result);
	  });
	}

	otherFunction(value){
		this.setState({
      winningAddress: value
    });
  }

  render() {
    return (
        <div>
          <Navigation winningAddress={this.state.winningAddress} contractAddress={contractAddress}/>
        </div>
    );
  }
}

export default App;
