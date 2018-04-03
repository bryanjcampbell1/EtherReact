import React, { Component } from 'react';
import Web3 from 'web3';

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


class QuizPreview extends Component {
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

      <div className="QuizPreview">
        <p>Status: Registration Active (Game Live at 2 pm EST)
        <button onClick={this.handleClick.bind(this)} > Buy In </button> </p>
        <p>Smart Contract Address: 0xfb35ad702e715e61a3f362c62da7c1bd235102fc</p>
        <p>Winning Wallet Address: 0x3233789cd8984e98a837f9d8079b800f755b1501</p>
      </div>

    );
  }
}


export default QuizPreview;
