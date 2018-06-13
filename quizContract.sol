pragma solidity ^0.4.11;

//in real contract add condition that now > gameStartTime in order
//to call payout

//smart for contract creator to be able to withdraw funds

//would be good for creator to see winningAddressArray to make sure
//it is being populated correctly

contract quizContract {

//-------------------------GLOBALS--------------------------------//
    bool gameOn;
    bool puzzleError;

    uint gameStartTime; //seconds since unix epoch
    uint  playerNumber;
    uint buyInAmount;
    uint gameNumber;

    address authorAddress;
    address winnerAddress;

    address[] paidPlayers;
    address[] winningAddressArray;

    function addPlayer(address player) constant returns (address[]) {
       paidPlayers.push(player);
       return paidPlayers;
    }

    function addNewWinningAddress(address hashedAnswer) constant returns (address[]) {
       winningAddressArray.push(hashedAnswer);
       return winningAddressArray;
    }

    // Addresses allowed to submit answers
    //mapping(address => bool) paidAddressesMap;

//----------------------Functions----------------------------------//

    function quizContract() public{
        gameOn = true;
        puzzleError = false;
        playerNumber = 0;
        gameNumber = 0;
        buyInAmount = 100000000000000000; //Amount of Wei needed for buyIn

        //give roughly an hour window for player to join game
        //before they can submit answer or ask for refund
        gameStartTime = now;

        //address eliptically generated from hashed answer
        winnerAddress = 0x28944f7d5B83D073988994bd57DfEe21Be39Cb7B;
        addNewWinningAddress(winnerAddress);
        authorAddress = msg.sender;
    }

    function buyIn() public payable  {
        bool paid = false;

        //check if player has already paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == msg.sender){
              paid = true;
          }
        }

        require(!paid); // require each address buy in only once
        //require(gameOn == true); // require game is active
        require(msg.value == buyInAmount);  // require correct buy in is paid

        //set address to paid
        addPlayer(msg.sender);

        playerNumber += 1;

    }

    function playerRefund() public {
        //refund is given if the sender has already paid
        //and either
        //1) there is a problem with the puzzle itself
        //2) the game has started and there are no opponents

        bool paid = false;

        //check if player has already paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == msg.sender){
              paid = true;
          }
        }

        require(paid);
        require(((playerNumber==1 ) && (now >= gameStartTime)) || (puzzleError == true) );

        gameOn = false;
        msg.sender.transfer(buyInAmount);

    }

    function PauseGameAllowRefund() public {
         //must be the contract's author to trigger function
         //turn game off
         //allow refund if puzzle is in error
        require(msg.sender == authorAddress);
        gameOn = false;
        puzzleError = true;
    }

    function ResumeGameAfterRefund() public {

        require(msg.sender == authorAddress);
        gameOn = true;
        puzzleError = false;
        gameNumber = gameNumber + 1;
        winnerAddress = winningAddressArray[gameNumber];
        paidPlayers.length = 0;

    }

    function addAnswer(address answer) public {
      //used so single contract can be updated with more than 1 answer
        require(msg.sender == authorAddress);
        addNewWinningAddress(answer);

    }

    function payout(address payTo, uint next12) public{
      require(now >= gameStartTime);

        bool paid = false;

        //check if player has paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == payTo){
              paid = true;
          }
        }

        require(paid);
        require(msg.sender == winnerAddress);

        gameOn = false;

        //PAYOUTS
        //worry about gas being too high to pay winner?
        //need to test this
        var authorPay = this.balance/10;
        var winnerPay = 9*this.balance/10;

        authorAddress.transfer(authorPay);
        payTo.transfer(winnerPay);


//Game is over.
//Increment gameNumber,change winningAddress, empty paidPlayers, set new start time
        gameNumber = gameNumber + 1;
        winnerAddress = winningAddressArray[gameNumber];
        paidPlayers.length = 0;
        gameStartTime = next12;

    }

    //Get data
    function loadPage(address userAddress) public view returns (address winnerAddress_, bool paid_, bool gameOn_, uint gameStartTime_)
    {
        winnerAddress_ = winnerAddress;
        bool paid = false;
        bool gameActive = false;

        //check if player has paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == userAddress){
              paid = true;
          }
        }
        paid_ = paid;

        if(now > gameStartTime){
            gameActive = true;
        }
        paid_ = paid;
        gameOn_ = gameActive ;
        gameStartTime_ = gameStartTime;

    }


}


}
