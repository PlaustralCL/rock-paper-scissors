function game(playerSelection, i) {
  /* The variable `i` is used for the round number as a carry over from the 
      console version where there was a loop to track playing 5 rounds. */
  
  // Get computer choice
    let computerSelection = computerPlay();

    // Play the round 
    winner = playRound(playerSelection, computerSelection);
    

    
    // Display information
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
  let computerSelection = getRandomIntInclusive(1, 3);
  switch (computerSelection) {
    case 1:
      computerSelection = "rock";
      break;
    case 2:
      computerSelection = "paper";
      break;
    case 3:
      computerSelection = "scissors";
  }
  return computerSelection;
}

function getRandomIntInclusive(min, max) { 
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function playRound(playerSelection, computerSelection) {
  // determines the winner of the round and returns the name of the winner
  if (playerSelection === computerSelection) {
    return "tie";
  } else if (playerSelection === "rock") {
      switch (computerSelection) {
        case "paper":
          return "computer";
          break;
        case "scissors":
          return "player";
      }

    } else if (playerSelection === "paper") {
      switch (computerSelection) {
        case "rock":
          return "player";
          break;
        case "scissors":
          return "computer"
      }

    } else if (playerSelection === "scissors") {
      switch (computerSelection) {
        case "rock":
          return "computer";
          break;
        case "paper":
          return "player"
      }
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

function winningStatement(winner) {
  if (winner === "computer") {
    computerScore += 1;
    return ' <span style="color: red"> You loose.</style>';
  } else if (winner === "player") {
    playerScore += 1;
    return ' <span style="color: green"> You win!</span>';
  } else if (winner === "tie") {
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
  roundNumber.textContent = '';
  choices.textContent = '';
  result.textContent = '';
  roundScoreHeader.textContent = '';
  roundScore.textContent = '';
  totalScore.textContent = '';
  replay.classList.remove("replay--active");

  /* Loop through all of the tableCol class (the class that was added to 
    each score in the table) and then removes it. THis is based on 
    https://stackoverflow.com/questions/10842471/how-to-remove-all-elements-of-a-certain-class-from-the-dom
    second answer, by leonheess */
  document.querySelectorAll('.tableCol').forEach(e => e.remove());
  document.getElementById('tablePlayTotal').textContent = '0';
  document.getElementById('tableCompTotal').textContent = '0';

  buttons.forEach((btn) => {
    btn.removeAttribute("disabled", ""); 
  }) 

  buttons.forEach((btn) => {
    btn.addEventListener('click', myClickRps);
  });
}

//Main code
//Global Variables
let winner;
let computerScore = 0;
let playerScore = 0;
let round = 0;
let gameStatus = 'active';

const roundNumber = document.querySelector('#roundNumber');
const choices = document.querySelector('#choices');
const result = document.querySelector('#result');
const roundScoreHeader = document.querySelector('#roundScoreHeader');
const roundScore = document.querySelector('#roundScore');
const totalScore = document.querySelector('#totalScore');
const replay = document.querySelector('.replay');

const buttons = document.querySelectorAll('.btn-rps');
buttons.forEach((btn) => {
  btn.addEventListener('click', myClickRps);
});

document.addEventListener('keydown', keyRPS);