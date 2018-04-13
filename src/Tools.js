import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button, FormGroup,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';
import EthUtil from 'ethereumjs-util';
import Web3 from 'web3';


const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var $ = require('jquery');

var abiData = [
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
	}
];


var gasVal = 25000;
var gasPrice = 40000000000;

var gasHex = '0x' + gasVal.toString(16);
var gpHex = '0x' + gasPrice.toString(16);

var contractAddress = "0xf73eecbb109b08e9b21084c191403df4f942d4f6";

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

			if(!web3.utils.checkAddressChecksum(textValue)){
				alert("Not a valid checksum address!");
			}
			else{
				web3.eth.getAccounts(function(error, result) {
          if(error != null)
              console.log("Couldnt get accounts");

         simpleContract.methods.payout(textValue).send({from: result[0]}, function(error, result){
					 if(!error){
							 console.log(JSON.stringify(result));
						 }
					 else{
							 console.error(error);
							 alert('Web pages can only access the Ethereum blockchain through a specialized plug in.  Consider downloading the MetaMask chrome extension!  ');
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
