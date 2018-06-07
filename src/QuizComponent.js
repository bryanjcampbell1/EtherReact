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
			},
			{
				"name": "gameStartTime_",
				"type": "uint256"
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
var contractAddress = "0x739e8ad301bbc778cc4db51c4d8664f9431188f4";
var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

function QuizDisplay(props) {
  const userHasInFactPaid = props.paid;
	var gameIsOn = props.gameLive;
	//gameIsOn = false;

  if ((userHasInFactPaid == true) && (gameIsOn == true)) { //user has paid and game is live
    return <div>
            <Details win={props.winner} step1={props.step1} step2={props.step2} step3={props.step3} step4={props.step4} step5={props.step5} step6={props.step6} step7={props.step7} step8={props.step8} step9={props.step9} picturePath={props.picturePath}/>
          </div>;
  }
	else if ((userHasInFactPaid == true) && (gameIsOn == false)) { //user has paid and game is not live
    return <div>
            <Registered />
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
	if(this.props.picturePath != "") {
		var path = "/img/"+this.props.picturePath;
    return(
      <div>
				<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
        <img src= {path} />
				<p>{this.props.step1}</p>
				<p>{this.props.step2}</p>
				<p>{this.props.step3}</p>
				<p>{this.props.step4}</p>
      </div>
    );
  }
  else if(this.props.step2 == "") {
    return(
      <div>
				<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
        <p>Step 1: {this.props.step1}</p>
      </div>
    );
  }
  else if(this.props.step3 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
    </div>
    );
  }
  else if(this.props.step4 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
    </div>
    );
  }
  else if(this.props.step5 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
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
  else{
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> Paste puzzle answer into Wallet Adress Generator on the Claim Prize tab <br /> Sign into the wallet corresponding to the private key generated <br /> Paste your original address into Claim Ether text field and get prize!<br /><br />Puzzle Description</div>
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


}
}

class Preview extends React.Component {
  render() {
    return (
      <div>
				<p>Buy in and Get Puzzle Description By Clicking Above! Buy in is 0.1 ETH </p>
				<p>Solve the puzzle first and win the Ether in the contract!</p>
				<p>For more details check out the Example page and source code{"\n"} {"\n"}</p>
      </div>
    );
  }
}

class Registered extends React.Component {
  render() {
    return (
			<div>
				<h1>Congrats! You have registered. Game details live at 12 EST</h1>
      </div>
    );
  }
}

class QuizComponent extends Component {

  constructor(props) {
    super(props);
    //var winningWalletAddress = this.props.winningAddress;
    //const winningAddress = props.winningAddress;
    //alert("yo" + winningAddress);

    this.state = {paid: false,
								gameLive: false,
                winner: "",
                step1: "",
                step2: "",
                step3: "",
                step4: "",
                step5: "",
                step6: "",
                step7: "",
                step8: "",
                step9: "",
								picturePath: ""
              };

  }

  componentWillMount(){

  		web3.eth.getAccounts((error, result) =>  {

  		    if(error != null){
						alert("Couldnt get accounts. Consider using the MetaMask chrome extension!");
					}
					else {
						simpleContract.methods.loadPage(result[0]).call((error, result) => {

							var initializedTime = new Date(result[2]*1000);
							//var initializedTime = new Date(2018, 4, 31, 10, 0, 0, 0);
				      var currentTime   = new Date();

				      var timeOfNext12  = new Date();
				      var timeTillNext12 = new Date();

				      timeOfNext12.setFullYear(initializedTime.getFullYear());
				      timeOfNext12.setMonth(initializedTime.getMonth());
				      timeOfNext12.setHours(12);
				      timeOfNext12.setMinutes(0);
				      timeOfNext12.setSeconds(0);
				      timeOfNext12.setMilliseconds(0);

				      if(initializedTime.getHours() < 12){ //game was initialized in the morning
				        timeOfNext12.setDate(initializedTime.getDate());  //next 12 is same date
				      }
				      else{ //game was initialized in the afternoon or evening
				        timeOfNext12.setDate(initializedTime.getDate() + 1);
				      }



				      timeTillNext12 = timeOfNext12 - currentTime;
				      //alert(timeTillNext12);

							if(timeTillNext12 < 0){ //game is live
								//alert("yo");

								this.setState({
									gameLive: true
								});

								//alert(result[1]);
								if (result[1] == 1){
		                   this.getData(result[0]).done(this.handleData.bind(this));

		             }
							}
							else{
								//display message that game details will be revealed at 12
								alert("Game Details Published at 12 EST");

							}


	   	 	  	});
					}

  		});

	}

  handleClick(e) {

    web3.eth.getAccounts((error, result) => {
        if(error != null){
            alert("Couldnt get accounts. Consider using the MetaMask chrome extension!");

					}
       simpleContract.methods.buyIn().send({
                               from: result[0],
                              value: ethHex
                           }, (error, result) => {
                             if(!error){


															 simpleContract.methods.loadPage("0xAf38454307fA6A9C9Dd57787B8Faf1D14F973202").call((error, result) => {
																 var initializedTime = new Date(result[2]*1000);
																 //var initializedTime = new Date(2018, 4, 31, 10, 0, 0, 0);
																 var currentTime   = new Date();

																 var timeOfNext12  = new Date();
																 var timeTillNext12 = new Date();

																 timeOfNext12.setFullYear(initializedTime.getFullYear());
																 timeOfNext12.setMonth(initializedTime.getMonth());
																 timeOfNext12.setHours(12);
																 timeOfNext12.setMinutes(0);
																 timeOfNext12.setSeconds(0);
																 timeOfNext12.setMilliseconds(0);

																 if(initializedTime.getHours() < 12){ //game was initialized in the morning
																	 timeOfNext12.setDate(initializedTime.getDate());  //next 12 is same date
																 }
																 else{ //game was initialized in the afternoon or evening
																	 timeOfNext12.setDate(initializedTime.getDate() + 1);
																 }



																 timeTillNext12 = timeOfNext12 - currentTime;
																 //alert(timeTillNext12);

																 if(timeTillNext12 < 0){ //game is live
																	 //alert("yo");

																	 this.setState({
																		 gameLive: true
																	 });


																	this.getData(result[0]).done(this.handleData.bind(this));


																 }
																 else{
																	 //display message that game details will be revealed at 12
																	 alert("Game Details Published at 12 EST");

																 }







															 });


                               }
                             else{

                                 console.error(error);
                                 var errorString = error.message.toString();
                                 if(errorString.includes("address specified")){
                                   alert("Couldnt get accounts. Consider using the MetaMask chrome extension!");
                                 }
																 else{

																	 alert(errorString);
																 }
                           }
                         });

    });
  }

  getData(addressObject) {
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
      step9: descriptionArray[9],
			picturePath: descriptionArray[11]
    });
  }

  render() {//stop
    var contractAddress = this.props.contractAddress;
    var winningAddress = this.state.winner;


    if (winningAddress != ""){
      winningAddress = "Winning Wallet Address: " + winningAddress;
    }

      return (
        <div className="TestingElement" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
        <Well className="text-center" style={{width: '95%', }}>
          <p><a href={'https://ropsten.etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
          <p><a href={'https://ropsten.etherscan.io/address/'+ winningAddress}>{winningAddress}</a></p>
					<Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Buy In </Button>
          <QuizDisplay paid={this.state.paid} gameLive={this.state.gameLive} step1={this.state.step1} step2={this.state.step2} step3={this.state.step3} step4={this.state.step4} step5={this.state.step5} step6={this.state.step6} step7={this.state.step7} step8={this.state.step8} picturePath={this.state.picturePath} />
        </Well>
        </div>

      );
    }
  }

export default QuizComponent;
