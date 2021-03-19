console.log(computerPlay());

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
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}