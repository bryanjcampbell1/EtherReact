pragma solidity ^0.4.11;

//would be good for creator to see winningAddressArray to make sure
//it is being populated correctly

contract quizContract {

//-------------------------GLOBALS--------------------------------//
    bool puzzleError;
    bool paused;

    uint priceTier;

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

//----------------------Functions----------------------------------//

    function quizContract() public{
        priceTier = 1;
        paused = false;
        playerNumber = 0;
        gameNumber = 0;
        buyInAmount = 10000000000000000; //Amount of Wei needed for buyIn

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
        require(paused == false); // require game is active
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

        require( paused == true);

        bool paid = false;

        //check if player has already paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == msg.sender){
              paid = true;
          }
          delete paidPlayers[i]; //remove player from paidPlayers
        }

        require(paid);
        msg.sender.transfer(buyInAmount);

    }

    function Pause() public {
        require(msg.sender == authorAddress);
        paused = true;
    }

    function Resume() public {

        require(msg.sender == authorAddress);
        paused = false;
        gameNumber = gameNumber + 1;
        winnerAddress = winningAddressArray[gameNumber];
        paidPlayers.length = 0;

    }
    function TogglePrice() public {
        require(msg.sender == authorAddress);

        priceTier = priceTier + 1;
        if(priceTier == 4){
            priceTier = 1;
        }

        if(priceTier == 1){
            buyInAmount = 10000000000000000; //set price low
        }
        else if(priceTier == 2){
            buyInAmount = 50000000000000000; //set price medium
        }
        else{
            buyInAmount = 100000000000000000; //set price high
        }
    }


    function AddAnswer(address answer) public {
      //used so single contract can be updated with more than 1 answer
        require(msg.sender == authorAddress);
        addNewWinningAddress(answer);

    }

    function payout(address payTo, uint next12) public{

        require(now >= gameStartTime);
        require(paused == false);

        bool paid = false;

        //check if player has paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == payTo){
              paid = true;
          }
        }

        require(paid);
        require(msg.sender == winnerAddress);

        //PAYOUTS
        var authorPay = this.balance/10;
        var winnerPay = 9*this.balance/10;

        authorAddress.transfer(authorPay);
        payTo.transfer(winnerPay);


        //Game is over. Set up next game.
        gameNumber = gameNumber + 1;
        winnerAddress = winningAddressArray[gameNumber];
        paidPlayers.length = 0;
        gameStartTime = next12;

        if(priceTier == 1){
            gameStartTime = now + 4 hours;
        }

    }

    function Emergency(){
        require(msg.sender == authorAddress);
        authorAddress.transfer(this.balance);
    }

    //Get data
    function loadPage(address userAddress) public view returns (address winnerAddress_, bool paid_, bool gameOn_, uint gameStartTime_, bool paused_, uint priceTier_)
    {

        bool paid = false;
        bool gameActive = false;

        //check if player has paid
        for (uint i=0; i<paidPlayers.length; i++) {
          if (paidPlayers[i] == userAddress){
              paid = true;
          }
        }


        if(now > gameStartTime){
            gameActive = true;
        }
        winnerAddress_ = winnerAddress;
        paid_ = paid;
        gameOn_ = gameActive ;
        gameStartTime_ = gameStartTime;
        paused_ = paused;
        priceTier_ = priceTier;
    }

}
