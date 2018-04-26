import React, { Component } from 'react';
import {  Well, Button } from 'react-bootstrap';

var $ = require('jquery');

var contractAddress = "";
var winningAddress = "";
var gameNumber = 1;
var descriptionArray = [];



function QuizDisplay(props) {
  const userHasInFactPaid = props.paid;
  if (userHasInFactPaid == true) { //user has paid
    return <div>
            <Details win={props.winner} />
          </div>;
  }
  else { //user has not paid
    return <div>
            <Preview />
          </div>;
  }

}

class Details extends React.Component {
  render() {
    return (
      <div style={{ height: '10%' }}>
        <p>{this.props.win}</p>
      </div>
    );
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div style={{ height: '10%' }}>
        <p>"nnnnnn"</p>
      </div>
    );
  }
}

class TestingElement extends Component {
  constructor(props) {
    super(props);
    this.state = {paid: false, winner:""};
  }

  handleClick(e) {
    this.getData().done(this.handleData.bind(this));
  }

  getData() {
    return $.ajax({
        url : "getDescription.php?g=" + gameNumber,
        type: 'GET'
    });
  }

 handleData(data) {
    descriptionArray  =  $.parseJSON(data);
    alert(descriptionArray[0]);

    this.setState({
      paid: true,
      winner: descriptionArray[0]
    });
  }



  render() {
      return (
        <div className="TestingElement" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
        <Well className="text-center" style={{width: '95%', }}>

          <Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Click Me! </Button>
          <p><a href={'https://ropsten.etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
          <p><a href={'https://ropsten.etherscan.io/address/'+ winningAddress}>Winning Wallet Address: {winningAddress}</a></p>
          <QuizDisplay paid={this.state.paid} winner={this.state.winner}/>
        </Well>
        </div>

      );
    }
  }

export default TestingElement;
