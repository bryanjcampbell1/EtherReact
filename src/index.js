import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import QuizPreview from './QuizPreview';
import QuizObject from './QuizObject';
import HomePage from './HomePage';
import Tools from './Tools';
import registerServiceWorker from './registerServiceWorker';
import Web3 from 'web3';

var $ = require('jquery');

/*
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
//web3.eth.getAccounts().then(console.log);
web3.eth.getAccounts(function(error, result) {
    if(error != null)
        console.log("Couldnt get accounts");
   //console.log(result[0]);
   console.log(result[0]);

   //get balance of current account
   web3.eth.getBalance(result[0], function(error, result){
       if(!error)
           console.log(JSON.stringify(result));
       else
           console.error(error);
   });

});
*/

ReactDOM.render(
  <div>
    <App />
  </div>
  , document.getElementById('root'));
registerServiceWorker();
