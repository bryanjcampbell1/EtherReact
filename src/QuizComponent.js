import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button } from 'react-bootstrap';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var QuizObject = {
    contractAddress: "0x44a1947efdd72eda8d0052a91f18dfd4f22565a2",
    winningAddress: '0x28944f7d5B83D073988994bd57DfEe21Be39Cb7B',
    description:"hello world"
};

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
var ethVal = 100000000000000000;
var gasVal = 25000;
var gasPrice = 40000000000;

var ethHex = '0x' + ethVal.toString(16);
var gasHex = '0x' + gasVal.toString(16);
var gpHex = '0x' + gasPrice.toString(16);

var contractAddress = QuizObject.contractAddress;
var winningAddress = QuizObject.winningAddress;

var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;


simpleContract.methods.getGameNumber().call( function(error, result){
                        if(!error){
                            console.log(JSON.stringify(result));
                            //alert(result);
                          }
                        else{
                            console.error(error);
                            var errorString = error.message.toString();

                          }
                    });
simpleContract.methods.getWinnerAddress().call( function(error, result){
                        if(!error){
                            console.log(JSON.stringify(result));
                            //alert(result);
                          }
                        else{
                            console.error(error);
                            var errorString = error.message.toString();

                          }
                    });


class QuizComponent extends Component {

  handleClick(e) {

    web3.eth.getAccounts(function(error, result) {
        if(error != null){
            console.log("Couldnt get accounts");

					}

       simpleContract.methods.buyIn().send({
                               from: result[0],
                              value: ethHex
                           }, function(error, result){
                               if(!error){
                                   console.log(JSON.stringify(result));
																 }
                               else{
                                   console.error(error);
																	 var errorString = error.message.toString();
																	 if(errorString.includes("address specified")){
																		 alert('Web pages can only access the Ethereum blockchain through a specialized plug in.  Consider using the MetaMask chrome extension!  ');
																	 }

																 }
                           });

    });
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="QuizObject" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
      <Well className="text-center" style={{width: '95%', }}>
        <p>Status: Registration Active (Game Live!)</p>
        <p>Buy In Amount: 0.1 ETH </p>
        <Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Buy In! </Button>
        <p><a href={'https://ropsten.etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
        <p><a href={'https://ropsten.etherscan.io/address/'+ winningAddress}>Winning Wallet Address: {winningAddress}</a></p>
        <p>Assign the numbers 1 through 26 to the letters a through z </p>
        <p>Find 2 US Presidents who’s first name letters add to the same number </p>
        <p>Take those 2 first names and combine them </p>
        <p>Delete any letter which shows up more than once </p>
        <p>Scramble the remaining letters and use them to obtain a word that would receive the highest Scrabble score</p>
        <p>You do not need to use all the remaining letters</p>
        <p>Use SHA3 on this word to derive the private key of the wallet that unlocks this puzzle’s smart contract.</p>
      </Well>
      </div>

    );
  }
}

export default QuizComponent;
