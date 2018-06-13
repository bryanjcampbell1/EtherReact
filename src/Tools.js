//instead of time to next 12 realy need time to next12EST

import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button, FormGroup,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';
import EthUtil from 'ethereumjs-util';
import Web3 from 'web3';



const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var $ = require('jquery');


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
		"name": "buyIn",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "PauseGameAllowRefund",
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
		"name": "ResumeGameAfterRefund",
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


var contractAddress = "0xa9d62578f2bd2b1497ff8d59a33af3493e584dd7";

var simpleContract = new web3.eth.Contract(abiData);
simpleContract.options.address = contractAddress;

var hexToBytes = function(hex) {
  for (var bytes = [], c = 0; c < hex.length; c+=2)
  bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

var privateKeyToAddress = function(privateKey) {
  return `0x${EthUtil.privateToAddress(hexToBytes(privateKey)).toString('hex')}`
}

class Tools extends Component {
  constructor(props, context) {
      super(props, context);

      this.handleChange = this.handleChange.bind(this);

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
    handleClick(e) {
      var textValue = this.textInput.value;
      var textBytes = web3.utils.asciiToHex(textValue);

			if(textValue ==""){
				alert("Not a valid checksum address!");
			}
			else if (!web3.utils.checkAddressChecksum(textValue) ) {
				alert("Not a valid checksum address!");
			}
			else{
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

							//alert(currentTime.getHours());

				      if(currentTime.getHours() < (16 - timeShift)) { //game was initialized in the morning
				        timeOfNext12.setDate(currentTime.getDate());  //next 12 is same date
				      }
				      else{ //game was initialized in the afternoon or evening
				        timeOfNext12.setDate(currentTime.getDate() + 1);
				      }

							//timeOfNext12.setDate(currentTime.getDate() + 1);

							//alert(parseMillisecondsIntoReadableTime(timeOfNext12 - currentTime));
							timeOfNext12 = timeOfNext12/1000 ;


         simpleContract.methods.payout(textValue,timeOfNext12).send({from: result[0], gasPrice: gpHex}, function(error, result){
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

      });}
    }

  render() {
    return (

      <div className="Tools" style={{padding: "20px" }}>
          <h1>Wallet address generator</h1>
          <h5>Enter puzzle answer below. Private key will be generated using the SHA3 hash. Wallet address will be generated from private key. </h5>
          <form>
            <FormGroup controlId="formBasicText">
              <FormControl type="text" onChange={this.handleChange}/>
              <FormControl.Feedback />
            </FormGroup>
          </form>
          <h4> private key: {this.state.private}</h4>
          <h4>wallet address: {this.state.public}</h4>

          <h1>Claim Your Ether!</h1>
          <h6>Check to make sure you are claiming Ether from within Winning Account</h6>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
            <Well className="text-center" style={{width: '95%', }}>
          <form>
            <FormGroup>
              <FormControl inputRef={input => this.textInput = input} type='text' placeholder="Paste the address of the account that you Bought In from here" />
              <Button bsStyle="primary" onClick={this.handleClick.bind(this)}> Claim Ether! </Button>
            </FormGroup>
          </form>
</Well>
      </div>
</div>
    );
  }
}

export default Tools;
