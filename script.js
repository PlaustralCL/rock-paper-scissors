

  let playerSelection = getPlayerInput();
  let computerSelection = computerPlay();
  console.log("You chose " + playerSelection);
  console.log("The computer chose " + computerSelection);
  console.log(showWinningRule(playerSelection, computerSelection));





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
          return "Paper beats rock. You loose";
          break;
        case "scissors":
          return "Rock beats scissors. You win!";
      }
    } else if (playerSelection === "paper") {
      switch (computerSelection) {
        case "rock":
          return "Paper beats rock. You win!";
          break;
        case "scissors":
          return "Scissors beat paper. You loose."
      }
    } else if (playerSelection === "scissors") {
      switch (computerSelection) {
        case "rock":
          return "Rock beat scissors. You loose";
          break;
        case "paper":
          return "Scissors beat paper. You win!"
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

