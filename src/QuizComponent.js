import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button, FormGroup,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';
import EthUtil from 'ethereumjs-util';
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
		"name": "AddAnswer",
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
		"inputs": [],
		"name": "Emergency",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "Pause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "payTo",
				"type": "address"
			},
			{
				"name": "next12",
				"type": "uint256"
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
		"constant": false,
		"inputs": [],
		"name": "Resume",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "TogglePrice",
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
				"name": "gameOn_",
				"type": "bool"
			},
			{
				"name": "gameStartTime_",
				"type": "uint256"
			},
			{
				"name": "paused_",
				"type": "bool"
			},
			{
				"name": "priceTier_",
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
var gasPrice = 10000000000;

var ethHex = '0x' + ethVal.toString(16);
var gasHex = '0x' + gasVal.toString(16);
var gpHex = '0x' + gasPrice.toString(16);

//contract address is hard coded --> doesnt have to be read in by state
var contractAddress = "0xe8707b70e702261077cc1418bc3a2be57e9d61d7";
var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

//-------------------------Helper functions----------------------------//

function parseMillisecondsIntoReadableTime(milliseconds){
  //Get hours from milliseconds
  var hours = milliseconds / (1000*60*60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : '0' + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : '0' +  absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : '0' + absoluteSeconds;


  return h + ':' + m + ':' + s;
}

var hexToBytes = function(hex) {
  for (var bytes = [], c = 0; c < hex.length; c+=2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

var privateKeyToAddress = function(privateKey) {
  return `0x${EthUtil.privateToAddress(hexToBytes(privateKey)).toString('hex')}`
}


//-------------------------Components----------------------------//
class QuizDisplay extends React.Component{

	constructor(props, context) {
      super(props, context);

      this.handleChange = this.handleChange.bind(this);

			//const userHasInFactPaid = props.paid;
			//var gameIsOn = props.gameLive;

      this.state = {
        value: '',
        private: '',
        public: ''
      };
    }


    handleChange(e) {
      if (e.target.value != ""){
      this.setState({
                        value: e.target.value,
                        private: web3.utils.sha3(e.target.value).substr(2),
                        public: web3.utils.toChecksumAddress(privateKeyToAddress(web3.utils.sha3(e.target.value).substr(2)))

                  });
      }
      else{
        this.setState({
          value: '',
          private: '',
          public: ''
                    });
      }
    }
render() {
		if(this.state.public == this.props.winningAddress){
			return <div>
			<Details win={this.props.winner} step1={this.props.step1} step2={this.props.step2} step3={this.props.step3} step4={this.props.step4} step5={this.props.step5} step6={this.props.step6} step7={this.props.step7} step8={this.props.step8} step9={this.props.step9} picturePath={this.props.picturePath}/>
			<h3>Wallet address generator</h3>
			<form>
				<FormGroup controlId="formBasicText">
					<FormControl type="text" onChange={this.handleChange}/>
					<FormControl.Feedback />
				</FormGroup>
			</form>
			<h4> private key: {this.state.private}</h4>
			<h4>wallet address: {this.state.public}</h4>
			<h2>Congrats! You Got It! Quick!</h2>
			<h2> 1) Import Account Corresponding to Private Key Above by Using Metamask </h2>
			<h2> 2) Switch to that Account </h2>
			<h2> 3) Claim Your Ether by Clicking Button First! </h2>
			<ClaimPrizeButton payOutAddress={this.props.paidAddress}/>
			</div>;
		}
	  else if ((this.props.paid == true) && (this.props.gameLive == true)) { //user has paid and game is live
	    return <div>
	            <Details win={this.props.winner} step1={this.props.step1} step2={this.props.step2} step3={this.props.step3} step4={this.props.step4} step5={this.props.step5} step6={this.props.step6} step7={this.props.step7} step8={this.props.step8} step9={this.props.step9} picturePath={this.props.picturePath}/>
							<h3>Wallet address generator</h3>
							<h5>Enter puzzle answer below. Private key will be generated using the SHA3 hash. Wallet address will be generated from private key. </h5>
		          <form>
		            <FormGroup controlId="formBasicText">
		              <FormControl type="text" onChange={this.handleChange}/>
		              <FormControl.Feedback />
		            </FormGroup>
		          </form>
		          <h4> private key: {this.state.private}</h4>
		          <h4>wallet address: {this.state.public}</h4>
						</div>;
	  }
		else if ((this.props.paid == true) && (this.props.gameLive == false)) { //user has paid and game is not live
	    return <div>
	            <Registered />
	          </div>;
	  }
	  else { //user has not paid
	    return <div>
	            <Preview price={this.props.price}/>
	          </div>;
	  }

	}
}

class Details extends React.Component {
  //const win = props.win;
render() {
	if(this.props.picturePath != "") {
		var path = "/img/"+this.props.picturePath;
    return(
      <div>
				<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
				<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
        <p>Step 1: {this.props.step1}</p>
      </div>
    );
  }
  else if(this.props.step3 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
    </div>
    );
  }
  else if(this.props.step4 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
      <p>Step 1: {this.props.step1}</p>
      <p>Step 2: {this.props.step2}</p>
      <p>Step 3: {this.props.step3}</p>
    </div>
    );
  }
  else if(this.props.step5 == "") {
    return(
    <div>
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
			<div style={{fontWeight: 'bold'}}>Congrats you have joined the game! <br /> <br /> Puzzle Description</div>
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
				<p>Buy in and Get Puzzle Description By Clicking Above! Buy in is {this.props.price} ETH </p>
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
				<h3>Congrats! You have registered! </h3>
				<h3>Quiz Details Will Appear When Game is Live </h3>
      </div>
    );
  }
}

class TimeBanner extends React.Component {
	render() {
		if(this.props.timeRemaining >=0) {
			var gameStartTime =parseMillisecondsIntoReadableTime(this.props.timeRemaining);
	    return(
				<div style={{fontWeight: 'bold', fontSize: '15px', textAlign: 'center'}}>
					<h4>Game Details Live in {gameStartTime}    		Register Now!</h4>
				</div>
	    );
	  }
		else {
			return(
	      <div style={{fontWeight: 'bold', fontSize: '15px', textAlign: 'center'}}>
					<h4>Game is Live! 		Register Now!</h4>
				</div>

	    );
		}

  }
}

class ClaimPrizeButton extends React.Component {
	  constructor(props, context) {
	      super(props, context);

	    }

	    handleClick(e) {
	      var textValue = this.props.payOutAddress;

				web3.eth.getAccounts(function(error, result) {
          if(error != null)
              console.log("Couldnt get accounts");


				      var currentTime   = new Date();
				      var timeOfNext12  = new Date();

							var timeShift = currentTime.getTimezoneOffset()/60;

				      timeOfNext12.setFullYear(currentTime.getFullYear());
				      timeOfNext12.setMonth(currentTime.getMonth());
				      timeOfNext12.setHours(16 - timeShift);
				      timeOfNext12.setMinutes(0);
				      timeOfNext12.setSeconds(0);
				      timeOfNext12.setMilliseconds(0);

							//Time of next game is 12 EST = 16 GMT

				      if(currentTime.getHours() < (16 - timeShift)) { //game was initialized in the morning
				        timeOfNext12.setDate(currentTime.getDate());  //next 12 is same date
				      }
				      else{ //game was initialized in the afternoon or evening
				        timeOfNext12.setDate(currentTime.getDate() + 1);
				      }

							timeOfNext12 = timeOfNext12/1000 ;

         simpleContract.methods.payout(textValue,timeOfNext12).send({from: result[0], gasPrice: gpHex}, function(error, result){
					 if(!error){
							 console.log(JSON.stringify(result));
							 alert("Congrats! Were you first? Check your Wallet! Funds distributed next block!");
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
  render() {
    return (

        <div>
	        <Button bsStyle="primary" onClick={this.handleClick.bind(this)}> Claim Your Ether! </Button>
					<h4>Pay out to {this.props.payOutAddress}</h4>
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
						this.setState({
							activeAccount: result[0]
						});
						simpleContract.methods.loadPage(result[0]).call((error, result) => {

							var gameOn = result[2];

							if(result[4] == true)
							{
								alert("Game has been pased due to Quiz error.  Request refund using Remix or do nothing and automatically be registered for the next game!");
							}
							if(result[5] == 1)
							{
								ethVal = 10000000000000000;
							}
							else if(result[5] == 2)
							{
								ethVal = 50000000000000000;
							}
							else{
								ethVal = 100000000000000000;
							}
							ethHex = '0x' + ethVal.toString(16);
							this.setState({
								price: ethVal
							});

							//initialize clock
							var currentTime   = new Date();
							var time = result[3]*1000 - currentTime; //miliseconds until game



							if((gameOn == true)&&(result[1] == 1)){ //game is live and paid

								this.setState({
									gameLive: true,
									paid: true,
									timeLeft: time,
									winner: result[0]
								});

								this.getData(result[0]).done(this.handleData.bind(this));

							}
							else if((gameOn != true)&&(result[1] == 1)){
								this.setState({
									paid: true,
									timeLeft: time,
									winner: result[0]
								});

							}
							else{
								this.setState({
									timeLeft: time,
									winner: result[0]
								});

							}

	   	 	  	});
					}

  		});

		}
	componentDidMount() {
		this.intervalID = setInterval(
			() => this.tick(),
			1000
		);
	}
	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	tick() {
		var timeRemaining = this.state.timeLeft - 1000;
		if(timeRemaining < 0){
			this.setState({
				timeLeft : timeRemaining,
				gameLive: true
			});

			if((this.state.paid ==true) && (this.state.step1 =="")){
				this.getData(this.state.winner).done(this.handleData.bind(this));
			}
		}
		else{
			this.setState({
				timeLeft : timeRemaining
			});
		}


}


  handleClick(e) {

    web3.eth.getAccounts((error, result) => {
        if(error != null){
            alert("Couldnt get accounts. Consider using the MetaMask chrome extension!");

					}
					//set paidAccount
					this.setState({
						activeAccount: result[0]
					});

       simpleContract.methods.buyIn().send({
                               from: result[0],
															 gasPrice: gpHex,
                              value: ethHex
                           }, (error, result) => {
                             if(!error){ //no problem buying in




															 simpleContract.methods.loadPage("0xAf38454307fA6A9C9Dd57787B8Faf1D14F973202").call((error, result) => {

																 if(!error){ //no problem getting current game info

																	 var gameOn = result[2];

										 							 if(gameOn == true){ //game is active

																		 this.setState({
																			 gameLive: true,
																			 winner: result[0]
																		 });

																		this.getData(result[0]).done(this.handleData.bind(this));


																	 }
																	 else{
																		 this.setState({
																			 paid: true,
																			 winner: result[0]
																		 });
																	 }

																 }
														 });


                               }

                             else{ //there was a problem buying in



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
		//setInterval(this.tick, 1000);

    var contractAddress = this.props.contractAddress;
    var winningAddress = this.state.winner;


    if (winningAddress != ""){
      winningAddress = "Winning Wallet Address: " + winningAddress;
    }

      return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
				<Well className="text-center" style={{width: '95%', }}>
					<TimeBanner timeRemaining={this.state.timeLeft}/>
          <p><a href={'https://etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
          <p><a href={'https://etherscan.io/address/'+ winningAddress}>{winningAddress}</a></p>
					<Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Buy In </Button>
          <QuizDisplay price={this.state.price/1000000000000000000} winningAddress={this.state.winner} paidAddress={this.state.activeAccount} paid={this.state.paid} gameLive={this.state.gameLive} step1={this.state.step1} step2={this.state.step2} step3={this.state.step3} step4={this.state.step4} step5={this.state.step5} step6={this.state.step6} step7={this.state.step7} step8={this.state.step8} picturePath={this.state.picturePath} />
        </Well>
        </div>

      );
    }
  }

export default QuizComponent;
