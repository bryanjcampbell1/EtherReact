import React, { Component } from 'react';
import {  Well, Button } from 'react-bootstrap';
import Web3 from 'web3';

var $ = require('jquery');

var descriptionArray = [];
var winningWalletAddress;


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
		"outputs": [
			{
				"name": "winnerAddress_",
				"type": "address"
			}
		],
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
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "loadPage",
		"outputs": [
			{
				"name": "winnerAddress_",
				"type": "address"
			},
			{
				"name": "paid_",
				"type": "bool"
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

//contract address is hard coded --> doesnt have to be read in by state
var contractAddress = "0x68ff225ac00d859bf0c88815f767e93d46a0a26e";
var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

function QuizDisplay(props) {
  const userHasInFactPaid = props.paid;
  if (userHasInFactPaid == true) { //user has paid
    return <div>
            <Details win={props.winner} step1={props.step1} step2={props.step2} step3={props.step3} step4={props.step4} step5={props.step5} step6={props.step6} step7={props.step7} step8={props.step8} step9={props.step9} />
          </div>;
  }
  else { //user has not paid
    return <div>
            <Preview />
          </div>;
  }

}


class Details extends React.Component {
  //const win = props.win;
render() {
  if(this.props.step2 == "") {
    return(
      <div>
        <p>Step 1: {this.props.step1}</p>
      </div>
    );
  }
  else if(this.props.step3 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
    </div>
    );
  }
  else if(this.props.step4 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
    </div>
    );
  }
  else if(this.props.step5 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
    </div>
    );
  }
  else if(this.props.step6 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
      <p>Step 5: {this.props.step5}</p>
    </div>
    );
  }
  else if(this.props.step7 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
      <p>Step 5: {this.props.step5}</p>
      <p>Step 6: {this.props.step6}</p>
    </div>
    );
  }
  else if(this.props.step8 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
      <p>Step 5: {this.props.step5}</p>
      <p>Step 6: {this.props.step6}</p>
      <p>Step 7: {this.props.step7}</p>
    </div>
    );
  }
  else if(this.props.step9 == "") {
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
      <p>Step 5: {this.props.step5}</p>
      <p>Step 6: {this.props.step6}</p>
      <p>Step 7: {this.props.step7}</p>
      <p>Step 8: {this.props.step8}</p>
    </div>
    );
  }
  else{
    return(
    <div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
      <p>Step 4: {this.props.step4}</p>
      <p>Step 5: {this.props.step5}</p>
      <p>Step 6: {this.props.step6}</p>
      <p>Step 7: {this.props.step7}</p>
      <p>Step 8: {this.props.step8}</p>
      <p>Step 9: {this.props.step9}</p>
    </div>
    );
  }

}
}

class Preview extends React.Component {
  render() {
    return (
      <div style={{ height: '10%' }}>
      </div>
    );
  }
}

class QuizComponent extends Component {

  constructor(props) {
    super(props);
    const winningWalletAddress = props.winningAddress;

    this.state = {paid: false,
                winner:"0xa496e724234a2Bf52776be7f4A11a7F691226dD2",
                step1: "",
                step2: "",
                step3: "",
                step4: "",
                step5: "",
                step6: "",
                step7: "",
                step8: "",
                step9: ""
              };
  }

  handleClick(e) {

    web3.eth.getAccounts((error, result) => {
        if(error != null){
            console.log("Couldnt get accounts");

					}

       simpleContract.methods.buyIn().send({
                               from: result[0],
                              value: ethHex
                           }, (error, result) => {
                             if(!error){

                                 simpleContract.methods.loadPage("0x81b6db6cb74165A4B5027Af9FAbc3CAFc9EAE030").call((error, result) => {
                          	 			//this.otherFunction(result);
                          				//alert(result[0]);
                          				//alert(result[1]);
                                  this.getData(result[0]).done(this.handleData.bind(this));

                          	 	  });

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

  getData(addressObject) {
    alert("here");
//Things to Check
    //var winningWalletAddress = this.props.winningAddress;
    var winningWalletAddress = addressObject;
    winningWalletAddress = winningWalletAddress.substring(2);

    return $.ajax({
        url : "getDescription.php?g=" + winningWalletAddress,
        type: 'GET'
    });
  }

 handleData(data) {
    descriptionArray  =  $.parseJSON(data);

    this.setState({
      paid: true,
      winner: "0x" + descriptionArray[0],
      step1: descriptionArray[1],
      step2: descriptionArray[2],
      step3: descriptionArray[3],
      step4: descriptionArray[4],
      step5: descriptionArray[5],
      step6: descriptionArray[6],
      step7: descriptionArray[7],
      step8: descriptionArray[8],
      step9: descriptionArray[9]
    });
  }

  render() {
    var contractAddress = this.props.contractAddress;
    var winningAddress = this.state.winner;

      return (
        <div className="TestingElement" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
        <Well className="text-center" style={{width: '95%', }}>
          <p>Join a Game! Get Puzzle Description By Clicking Below!  Buy in is 0.1 ETH </p>
          <p>Solve the puzzle first and win the Ether in the contract!</p>
          <p>For more details check out the Example page and source code{"\n"} {"\n"}</p>
          <Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Buy In </Button>
          <p><a href={'https://ropsten.etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
          <p><a href={'https://ropsten.etherscan.io/address/'+ winningAddress}>Winning Wallet Address: {winningAddress}</a></p>
          <QuizDisplay paid={this.state.paid} step1={this.state.step1} step2={this.state.step2} step3={this.state.step3} step4={this.state.step4} step5={this.state.step5} step6={this.state.step6} step7={this.state.step7} step8={this.state.step8} step9={this.state.step9} />
        </Well>
        </div>

      );
    }
  }

export default QuizComponent;
