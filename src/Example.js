import React, { Component } from 'react';
import { Well, Button } from 'react-bootstrap';

import genKey from './generateKeys.png';
import metaMask from './metamask.png';
import win from './winningWallet.png';
import impAcc from './importAccount.png';
import claim from './claim2.png';

class Example extends React.Component {
  render() {
    return (
      <div style={{padding: "20px" }} >
        <h1>Example Quiz</h1>
        <h3>Step 1: Download the Metamask Chrome Extension and Sign In.</h3>
        <h5>Make sure to transfer Ether to your account</h5>

        <Well className="text-center" style={{display: 'flex', justifyContent: 'center', marginTop: 25}}>
          <img src={metaMask} alt="metaMask"/>
        </Well>

          <h3>Step 2: Register for the Game </h3>
          <h5>To register, click the "Buy In" button send the requested amount of Ether.</h5>
          <h5>The account that you send Ether from will be the same account paid out to if you win.</h5>

          <div>
            <Well className="text-center">
              <p>Status: Registration Active (Game Live at 12:30 pm)</p>
              <p>Buy In Amount: 0.01 ETH </p>
              <Button bsStyle="primary"> Buy In! </Button>
              <p style={{color: "green" }}>Smart Contract Address: 0xc69b962bdebc87b39eeaa8672884e9c053246295 </p>
              <p style={{color: "green" }}>Winning Wallet Address: 0x28944f7d5b83d073988994bd57dfee21be39cb7b </p>
            </Well>
        </div>
            <h3>Step 3: Solve the Puzzle </h3>
            <h5>Puzzle description added when game goes live.  Rush to solve it first!</h5>
            <h5>The winner will recieve 90% of all the Ether in the contract!</h5>
            <h5>(If the game is live and you are the only one who has entered the game, you may withdraw your entry.)</h5>

          <div>
            <Well className="text-center" >
              <p>Status: Registration Active (Game Live!)</p>
              <p>Buy In Amount: 0.01 ETH </p>
              <Button bsStyle="primary"> Buy In! </Button>
              <p style={{color: "green" }}>Smart Contract Address: 0xc69b962bdebc87b39eeaa8672884e9c053246295 </p>
              <p style={{color: "green" }}>Winning Wallet Address: 0x28944f7d5b83d073988994bd57dfee21be39cb7b </p>
              <p>Assign the numbers 1 through 26 to the letters a through z </p>
              <p>Find 2 US Presidents who’s first name letters add to the same number </p>
              <p>Take those 2 first names and combine them </p>
              <p>Delete any letter which shows up more than once </p>
              <p>Scramble the remaining letters and use them to obtain a word that would receive the highest Scrabble score</p>
              <p>You do not need to use all the remaining letters</p>
              <p>Use Tools page to generate the private key of the wallet that unlocks this puzzle’s smart contract.</p>
            </Well>
          </div>
            <h3>Solution</h3>
            <div>
              <Well className="text-center" >
                <h3>Grover = 7 + 18 + 15 + 22 + 5 + 18 = 85</h3>
                <h3>Franklin = 6 + 18 + 1 + 14 + 11 + 12 + 9 + 14 = 85</h3>
                <h3>govefankli</h3>
                <h3>fanglike</h3>
              </Well>
            </div>
            <h3>Step 4: Get the Keys </h3>
            <h5>Click on the "Claim Prize" tab at the top of the page</h5>
            <h5>Paste your solution into the text field to derive the public and private keys </h5>
            <Well style={{ justifyContent: 'center', marginTop: 25}}>
              <img src={genKey} alt="genKey" style={{maxWidth: '95%'}}/>
            </Well>
            <h3>Step 5: Claim Your Ether! </h3>
            <h5>Enter the Winning Wallet by selecting "import account" and using the private key derived in Step 3 </h5>
            <Well className="text-center" style={{ justifyContent: 'center', marginTop: 25}}>
              <img src={impAcc} alt="impAcc" />
            </Well>
            <h5>Click the "Claim Your Ether!" button. </h5>
            <Well className="text-center" style={{ justifyContent: 'center', marginTop: 25}}>
              <img src={claim} alt="claim" style={{maxWidth: '95%'}}/>
            </Well>
            <h5>Funds will be distributed when the next block is mined. </h5>

      </div>
    );
  }
}

export default Example;
