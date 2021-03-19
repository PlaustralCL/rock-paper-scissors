

let winner;
let computerScore = 0;
let playerScore = 0;

game();


function game() {
  
  for (i = 1; i <=5; i++) {

    // Make computer and player choices
    let playerSelection = getPlayerInput();
    let computerSelection = computerPlay();
    console.log("%cRound #" + i, "font-weight: bold;")
    console.log("You chose " + playerSelection);
    console.log("The computer chose " + computerSelection);

    // Play the round 
    console.log(showWinningRule(playerSelection, computerSelection));
    winner = playRound(playerSelection, computerSelection);
    
    //  Show winner and track scores
    if (winner === "computer") {
      computerScore += 1;
      console.log("%cYou loose.", "color: red;");
    } else if (winner === "player") {
      playerScore += 1;
      console.log("%cYou win!", "color: green;");
    }

    console.log("Round " + i + " score");
    console.log("Your score: " + playerScore + " Computer score: " + computerScore);
    console.log("---------------------")
    if (i === 5) {
      if (playerScore > computerScore) {
        console.log("%cYOU WON THE MATCH!!!", "color: green;");        
      } else if (playerScore < computerScore) {
          console.log("You lost the match.");          
      }
    }

  } // end for for loop
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
      break;
    default:
      computerSelection = "default";
  }
  return computerSelection;
}

function getRandomIntInclusive(min, max) { 
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function getPlayerInput() {
  let playerSelection = prompt("Choose 'Rock', 'Paper' or 'Scissors'");
  return playerSelection.toLowerCase();
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "It's a tie!";
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
          return "player!"
      }
    }
}

function showWinningRule(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "They are the same.";
  } else if ((playerSelection === "rock" || computerSelection === "rock") &&
        (playerSelection === "paper" || computerSelection === "paper")) {
      return "Paper beats rock.";

  } else if ((playerSelection === "rock" || computerSelection === "rock") &&
        (playerSelection === "scissors" || computerSelection === "scissors")) {
      return "Rock beats scissors.";

  } else if ((playerSelection === "paper" || computerSelection === "paper") &&
        (playerSelection === "scissors" || computerSelection === "scissors")) {
      return "Scissors beat paper."
  }
}


