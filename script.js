

  let playerSelection = "scissors";
  let computerSelection = computerPlay();

  console.log("You chose " + playerSelection);
  console.log("The computer chose " + computerSelection);

  console.log(playRound(playerSelection, computerSelection));





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
  let selection = prompt("Choose 'Rock', 'Paper' or 'Scissors'");
  return selection.toLowerCase;
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
          break;
        default:
          return "default"
      }
    } else if (playerSelection === "paper") {
      switch (computerSelection) {
        case "rock":
          return "Paper beats rock. You win!";
          break;
        case "scissors":
          return "Scissors beat paper. You loose."
          break;
        default:
          return "default"
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

