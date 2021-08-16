import { winnerImageChange, resultsDisplay, winnerDisplay, pointsAddition, capitalizeFirstLetter } from './modules/helpers.js';

function imageChange(user){
    if (user.id === "player" && user.dataset.points !== "5"){
        const playerImage = document.querySelector('.player-image');
        const computerImage= document.querySelector('.robot-image');
        playerImage.src = './images/playerHappy.jpg';
        computerImage.src = './images/robotSad.png';
    }

    if (user.id === 'computer' && user.dataset.points !== "5"){
        const playerImage = document.querySelector('.player-image');
        const computerImage= document.querySelector('.robot-image');
        playerImage.src = './images/playerSad.jpg';
        computerImage.src = './images/robotHappy.png';
    }
}

function imageReset(){
    const playerImage = document.querySelector('.player-image');
    const computerImage = document.querySelector('.robot-image');
    playerImage.src = './images/playerNormal.jpg';
    computerImage.src = './images/robotNormal.png';
}

// Reset points to 0
const resetPoints = (user) => {
    user.dataset.points = "0";
    user.textContent = `${capitalizeFirstLetter(user.id)}: ${user.dataset.points}`
}

const resetGame = function(user, opponent){

        let resetButton = document.createElement('button');
        const results = document.querySelector('.results');
        const gameButtons = document.querySelectorAll('.game-button');
        resetButton.textContent = 'Want to play again?';
        gameButtons.forEach(button => {
            button.disabled = true;
            button.classList.remove('clicked');
        });       
        resetButton.classList.add('resetButton');
        results.appendChild(resetButton);
        resetButton.addEventListener('click', function(){
            resetPoints(user);
            resetPoints(opponent);
            resetButton.remove();
            imageReset();
            gameButtons.forEach(button => {
                button.disabled = false;
            });
            if (document.querySelector('.clicked')){
                gameButtons.forEach(button => button.classList.remove('clicked'));
            }
            winnerDisplay('');
        })
    }

function computerPlay () {
    const choices = ['Rock', 'Paper', 'Scissors']
    const randomIndex = Math.floor(Math.random() * 3)

    return choices[randomIndex]
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
            const playerImage = document.querySelector('.player-image');
            const computerImage= document.querySelector('.robot-image');
            playerImage.src = './images/playerDraw.jpg';
            computerImage.src = './images/robotDraw.png';

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
    imageChange(user);
    
    if (user.dataset.points === "5" && user.id === "player"){
        winnerDisplay('Congrats! You defeated the Computer!');
        winnerImageChange(user);
        resetGame(user, opponent);
        
        
    }

    else if (user.dataset.points === "5" && user.id ==="computer"){
        winnerDisplay('Sorry, you lost. Better luck next time...');
        winnerImageChange(user);
        resetGame(user, opponent);
        
    }
}

window.addEventListener('click', function(event){

    if (!event.target.id) return;

    if (document.querySelector('.clicked')){
        document.querySelectorAll('.game-button').forEach(button => button.classList.remove('clicked'));
    }

    let playerSelection = event.target.id;
    let computerSelection = computerPlay();


    const roundResult = playRound(playerSelection, computerSelection);

    let player = document.querySelector('#player');
    let computer = document.querySelector('#computer');
    const winAudio = document.querySelector('#victory-button-sound');
    const lossAudio = document.querySelector('#loss-button-sound');
    const drawAudio = document.querySelector('#draw-button-sound');
    const victoryAudio = document.querySelector('#victory-sound');
    const gameOverAudio = document.querySelector('#loss-sound');

    if (roundResult === true) game(player, computer);
    else if (roundResult === false) game(computer, player);

    const playerButton = document.querySelector(`#${playerSelection}`);

    if (playerButton.id.startsWith('computer') || playerButton.id.startsWith('player')) return;

    const computerButton = document.querySelector(`#computer-${computerSelection}`);

    playerButton.classList.add('clicked');
    computerButton.classList.add('clicked');

    if (player.dataset.points === '5' || computer.dataset.points === '5'){
        if (roundResult === true) victoryAudio.play();
        if (roundResult === false) gameOverAudio.play();
    }
    else if (roundResult === true)
    {
    winAudio.currentTime = 0;
    winAudio.play();
    }
    else if (roundResult === false){
        lossAudio.currentTime = 0;
        lossAudio.play();
    }
    else{
        drawAudio.currentTime = 0;
        drawAudio.play();
    }
    
})