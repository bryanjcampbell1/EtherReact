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
      this.setState({ value: e.target.value,
                      private: web3.utils.sha3(e.target.value).substr(2),
                      public: privateKeyToAddress(web3.utils.sha3(e.target.value).substr(2))
                    });
    }
    handleClick(e) {
      alert(this.textInput.value);

    }

  render() {
    return (

      <div className="Tools" style={{padding: "20px" }}>
          <h1>Wallet address generator</h1>
          <h6>Enter puzzle answer below. Private key will be generated using sha256. Wallet address will be generated from private key. </h6>
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
