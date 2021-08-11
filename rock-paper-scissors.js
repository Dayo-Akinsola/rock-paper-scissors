function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

function computerPlay () {
    const choices = ['Rock', 'Paper', 'Scissors']
    const randomIndex = Math.floor(Math.random() * 3)

    return choices[randomIndex]
}

// Function to show the results of a round on the screen
const resultsDisplay = (result, selection1, selection2) => {
    if (document.querySelector('p')){
        const div = document.querySelector('.result-sentence');
        let old_results = document.querySelector('p');
        let results = document.createElement('p');
        results.textContent = `You ${result}! ${selection1} beats ${selection2}`;
        div.replaceChild(results, old_results);
    }
    else{
        const div = document.querySelector('.result-sentence');
        let results = document.createElement('p');
        results.textContent = `You ${result}! ${selection1} beats ${selection2}`;
        div.appendChild(results);
    } 
}

// Function to display the winner of a game on screen
const winnerDisplay = (textContent) => {
    const div = document.querySelector('.result-sentence');
    const oldResult = document.querySelector('p')
    let finalResult = document.createElement('p');
    finalResult.textContent = textContent;
    div.replaceChild(finalResult, oldResult);
}

const pointsAddition = (user) => {
    user.dataset.points = parseInt(user.dataset.points) + 1;
    user.textContent = `${capitalizeFirstLetter(user.id)} Score: ${user.dataset.points}`
}

const resetPoints = (user) => {
    user.dataset.points = "0";
    user.textContent = `${capitalizeFirstLetter(user.id)} Score: ${user.dataset.points}`
}



function playRound (playerSelection, computerSelection) {
    if (playerSelection === "Rock" && computerSelection === "Scissors"){
        resultsDisplay('Win', playerSelection, computerSelection);
        return true
    }

    if (playerSelection ===  "Scissors" && computerSelection === "Paper"){
        resultsDisplay('Win', playerSelection, computerSelection);
        return true
    }

    if (playerSelection ===  "Paper" && computerSelection === "Rock"){
        resultsDisplay('Win', playerSelection, computerSelection);
        return true 
    }

    if (playerSelection === "Rock" && computerSelection === "Paper"){
        resultsDisplay('Lose', computerSelection, playerSelection);
        return false
    }

    if (playerSelection === "Scissors" && computerSelection === "Rock"){
        resultsDisplay('Lose', computerSelection, playerSelection)
        return false
    }

    if (playerSelection === "Paper" && computerSelection === "Scissors"){
        resultsDisplay('Lose', computerSelection, playerSelection)
        return false
    }
    
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()){
        if (document.querySelector('p')){
            const div = document.querySelector('.result-sentence')
            const old_results = document.querySelector('p');
            let results = document.createElement('p');
            results.textContent = `A draw! You both picked ${computerSelection}`
            div.replaceChild(results, old_results);

        }
        else{
            const div = document.querySelector('.result-sentence');
            let results = document.createElement('p');
            results.textContent = `A draw! You both picked ${computerSelection}`
            div.appendChild(results);
        }
    }
}

function game(user, opponent){
    pointsAddition(user);
    
    if (user.dataset.points === "5" && user.id === "player"){
        winnerDisplay('Congrats! You defeated the Computer!');
        resetPoints(user);
        resetPoints(opponent);
    }

    else if (user.dataset.points === "5" && user.id ==="computer"){
        winnerDisplay('You lost. I guess the Computer was too good...');
        resetPoints(user);
        resetPoints(opponent);
    }
}

document.addEventListener('click', function(event){
    let playerSelection = event.target.id;
    let computerSelection = computerPlay();

    const roundResult = playRound(playerSelection, computerSelection);
    console.log(roundResult)

    let player = document.querySelector('#player');
    let computer = document.querySelector('#computer');

    if (roundResult === true) game(player, computer);
    else if (roundResult === false) game(computer, player);
    
    
})