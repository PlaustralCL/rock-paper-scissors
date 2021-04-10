function game(playerSelection, i) {
  /* The variable `i` is used for the round number as a carry over from the 
      console version where there was a loop to track playing 5 rounds. */
      let winner;
      const roundNumber = document.querySelector('#roundNumber');
      const choices = document.querySelector('#choices');
      const result = document.querySelector('#result');
      const roundScoreHeader = document.querySelector('#roundScoreHeader');
      const roundScore = document.querySelector('#roundScore');

  // Get computer choice
    let computerSelection = computerPlay();

    // Play the round 
    winner = playRound(playerSelection, computerSelection);
    
    // Display information
    roundNumber.style.fontWeight = 'bold';
    roundNumber.textContent = 'Round #'+ i;
    choices.textContent = 'You chose ' + playerSelection +
        '. The computer chose ' + computerSelection +'.';
    result.innerHTML = findWinningRule(playerSelection, computerSelection) +
        ' ' + winningStatement(winner);
    
    document.getElementById('tablePlayTotal').textContent = playerScore;
    document.getElementById('tableCompTotal').textContent = computerScore;
    updateTableRound();
    updateTableScoreP(winner);
    updateTableScoreC(winner);
 
    // report running score
    if (i === 1) { // change grammer for 1 vs multiple rounds
      roundScoreHeader.textContent = 'Score after ' + i + ' round -';
    } else {
        roundScoreHeader.textContent = 'Score after ' + i + ' rounds -';
    }    
    roundScore.textContent = 'Your score: ' + playerScore + ' Computer score: ' + computerScore;
    
    // report final resutls
    if (playerScore === 5 || computerScore ===5) {
      finalResults(); 
    }
}

function computerPlay() {
  const computerChoices = ['rock', 'paper', 'scissors'];
  let computerSelection = computerChoices[getRandomIntInclusive(0, 2)];
  return computerSelection;
}

function getRandomIntInclusive(min, max) { 
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function playRound(playerSel, computerSel) {
  // determines the winner of the round and returns the name of the winner
  if (playerSel === computerSel) {
    return "tie";
  } else if ((playerSel === 'rock' && computerSel === 'scissors') ||
        (playerSel === 'paper' && computerSel === 'rock') ||
        (playerSel === 'scissors' && computerSel ==='paper')) {
      // These are all the possible winning combinations for the player
          return 'player';
    } else {
      // If it's not a tie or the player winning, the computer wins
      return 'computer';
    }
}

function findWinningRule(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "They are the same.";
  } else if ((playerSelection === "rock" || computerSelection === "rock") &&
        (playerSelection === "paper" || computerSelection === "paper")) {
      return "Paper covers rock.";

  } else if ((playerSelection === "rock" || computerSelection === "rock") &&
        (playerSelection === "scissors" || computerSelection === "scissors")) {
      return "Rock smashes scissors.";

  } else if ((playerSelection === "paper" || computerSelection === "paper") &&
        (playerSelection === "scissors" || computerSelection === "scissors")) {
      return "Scissors cut paper."
  }
}

function winningStatement(winningPlayer) {
  if (winningPlayer === "computer") {
    computerScore += 1;
    return ' <span style="color: red"> You loose.</style>';
  } else if (winningPlayer === "player") {
    playerScore += 1;
    return ' <span style="color: green"> You win!</span>';
  } else if (winningPlayer === "tie") {
    return ' <span style="color: blue">It\'s a tie.</span>';
  }
}

function updateTableRound() {
  const th = document.createElement('th');
  let textNode = document.createTextNode(round);
  th.appendChild(textNode);
  th.classList.add("tableCol");
  document.getElementById('tableRound').appendChild(th);
  return;
}

/* Used two functions to update the table scores rather than finding the logic
to determine which score to place in which row. */
function updateTableScoreP(result) {
  if (result === 'player') {
    result = '1';
  } else {
    result = '0';
  }
  const td = document.createElement('td');
  let textNode = document.createTextNode(result);
  td.appendChild(textNode);
  td.classList.add("tableCol");
  document.getElementById('tablePlayer').insertBefore(td, document.getElementById('tablePlayTotal'));
  return;
}

function updateTableScoreC(result) {
  if (result === 'computer') {
    result = '1';
  } else {
    result = '0';
  }
  const td = document.createElement('td');
  let textNode = document.createTextNode(result);
  td.appendChild(textNode);
  td.classList.add("tableCol");
  document.getElementById('tableComputer').insertBefore(td, document.getElementById('tableCompTotal'));
  return;
}

function myClickRps() { // used as a named function for addEventListener
  round++;
  game(this.id, round);
}

function myClickReplay () {
  if (this.id === 'yes') {
    newGame();
  }
}

function keyRPS(event) {
  if (gameStatus === 'active') {
    if (event.key === 'q' || event.key === 'Q') {
      finalResults(); 
    } else if( event.key === 'r' || event.key === 'R') {
        round++;
        game('rock', round);
    } else if (event.key === 'p' || event.key === 'P') {
        round++;
        game('paper', round);
    } else if (event.key === 's' || event.key === 'S') {
        round++;
        game('scissors', round);
    }
  } else if (gameStatus === 'over') {
      if (event.key === 'y' || event.key === 'Y') {
        newGame();
      }
  }
}

function finalResults() {
  const totalScore = document.querySelector('#totalScore');
  if (playerScore > computerScore) {
    totalScore.style.color = 'green';
    totalScore.style.fontWeight = 'bold';
    totalScore.textContent = 'YOU WON THE MATCH!!!';  
    gameOver();      
  } else if (playerScore < computerScore) {
    totalScore.style.color = 'red';
    totalScore.style.fontWeight = 'bold';  
    totalScore.textContent = 'You lost the match.';  
      gameOver();        
  } else if (playerScore === computerScore) {
      if (round != 0) {
        totalScore.style.color = 'blue';
        totalScore.style.fontWeight = 'bold';
        totalScore.textContent = 'The match ended in a tie.';  
        gameOver(); 
      } else {
        gameOver();
      }
  }
}

function gameOver() {
  gameStatus = 'over';  
  buttons.forEach((btn) => {
    btn.setAttribute("disabled", ""); //easier than removing the click function
  }) 

  buttons.forEach((btn) => {
    btn.classList.add('btn--disabled');
  })

  replay.classList.add("replay--active");
  
  const replayButtons = document.querySelectorAll('.btn-replay');
  replayButtons.forEach((btn) => {
  btn.addEventListener('click', myClickReplay);
  });
}

function newGame() {
  computerScore = 0;
  playerScore = 0;
  round = 0;
  gameStatus = 'active';

  //resets all game generated text
  document.querySelector('#roundNumber').textContent = '';
  document.querySelector('#choices').textContent = '';
  document.querySelector('#result').textContent = '';
  document.querySelector('#roundScoreHeader').textContent = '';
  document.querySelector('#roundScore').textContent = '';
  document.querySelector('#totalScore').textContent = '';
  replay.classList.remove("replay--active");

  /* Loop through all of the tableCol class (the class that was added to 
    each score in the table) and then removes it. THis is based on 
    https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
    second answer, by leonheess */
  document.querySelectorAll('.tableCol').forEach(e => e.remove()); //removes the generated table data (td) elements
  document.getElementById('tablePlayTotal').textContent = '0';
  document.getElementById('tableCompTotal').textContent = '0';

  buttons.forEach((btn) => {
    btn.removeAttribute("disabled", ""); 
  }) 

  buttons.forEach((btn) => {
    btn.classList.remove('btn--disabled');
  })

  buttons.forEach((btn) => {
    btn.addEventListener('click', myClickRps);
  });
}

//Main code
//Global Variables
let computerScore = 0;
let playerScore = 0;
let round = 0;
let gameStatus = 'active';
const replay = document.querySelector('.replay');

//Click listener
const buttons = document.querySelectorAll('.btn-rps');
buttons.forEach((btn) => {
  btn.addEventListener('click', myClickRps);
});

//Keyboard listner
document.addEventListener('keydown', keyRPS);