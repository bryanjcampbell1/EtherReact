//instead of time to next 12 realy need time to next12EST

import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Well, Button, FormGroup,ControlLabel,FormControl,HelpBlock } from 'react-bootstrap';
import EthUtil from 'ethereumjs-util';
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

var $ = require('jquery');


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

</div>
    );
  }
}

export default Tools;
