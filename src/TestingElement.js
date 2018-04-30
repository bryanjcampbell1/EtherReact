import React, { Component } from 'react';
import {  Well, Button } from 'react-bootstrap';

var $ = require('jquery');

//var contractAddress = "";
//var winningAddress = "";
var gameNumber = 1;
var descriptionArray = [];



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
        <p>"nnnnnn"</p>
      </div>
    );
  }
}

class TestingElement extends Component {

  constructor(props) {
    super(props);
  
    this.state = {paid: false,
                winner:"",
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
      winner: descriptionArray[0],
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
    var winningAddress = this.props.winningAddress;

      return (
        <div className="TestingElement" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
        <Well className="text-center" style={{width: '95%', }}>

          <Button bsStyle="primary" onClick={this.handleClick.bind(this)} > Click Me! </Button>
          <p><a href={'https://ropsten.etherscan.io/address/'+ contractAddress}>Smart Contract Address: {contractAddress}</a></p>
          <p><a href={'https://ropsten.etherscan.io/address/'+ winningAddress}>Winning Wallet Address: {winningAddress}</a></p>
          <QuizDisplay paid={this.state.paid} step1={this.state.step1} step2={this.state.step2} step3={this.state.step3} step4={this.state.step4} step5={this.state.step5} step6={this.state.step6} step7={this.state.step7} step8={this.state.step8} step9={this.state.step9} />
        </Well>
        </div>

      );
    }
  }

export default TestingElement;
