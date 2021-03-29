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
    result.textContent = findWinningRule(playerSelection, computerSelection) +
        ' ' + winningStatement(winner);
    

 
    // report running score
    if (i === 1) { // change grammer for 1 vs multiple rounds
      roundScoreHeader.textContent = 'Score after ' + i + ' round -';
    } else {
      roundScoreHeader.textContent = 'Score after ' + i + ' rounds -';
    }    
    roundScore.textContent = 'Your score: ' + playerScore + ' Computer score: ' + computerScore;
   
    
    // report final resutls
    if (playerScore === 5 || computerScore ===5) {
      if (playerScore > computerScore) {
        totalScore.textContent = 'YOU WON THE MATCH!!!';        
      } else if (playerScore < computerScore) {
          totalScore.textContent = 'You lost the match.';          
      }     
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

function getPlayerInput() {
  let playerSelection = prompt("Choose 'Rock', 'Paper' or 'Scissors'");
  return validateInput(playerSelection);
}

function validateInput(playerSelection) {
  if (playerSelection === null) { // escape or cancel button
    return "end";
  } else if (playerSelection.toLowerCase() === "rock" || 
      playerSelection.toLowerCase() === "paper" || 
      playerSelection.toLowerCase() === "scissors") {
    return playerSelection.toLowerCase();    
  } else {
      return "bad";
    }
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
    return ' You loose.';
  } else if (winner === "player") {
    playerScore += 1;
    return ' You win!';
  } else if (winner === "tie") {
    return ' It\'s a tie';
  }
}



//Main code
let winner;
let computerScore = 0;
let playerScore = 0;
let round = 0;

const roundNumber = document.querySelector('#roundNumber');
const choices = document.querySelector('#choices');
const result = document.querySelector('#result');
const roundScoreHeader = document.querySelector('#roundScoreHeader');
const roundScore = document.querySelector('#roundScore');
const totalScore = document.querySelector('#totalScore');


const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    round++;
    game(btn.id, round);
  });
});


/* game(); // calls the overall controlling function
console.log("%cGame Over. %cTo play again, refresh the browser.", 
          "font-weight: bold;", "font-weight: normal;");
 */