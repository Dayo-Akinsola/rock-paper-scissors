function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

// Give a point to player or computer
const pointsAddition = (user) => {
    user.dataset.points = parseInt(user.dataset.points) + 1;
    user.textContent = `${capitalizeFirstLetter(user.id)}: ${user.dataset.points}`
}

function winnerImageChange(user){
    if (user.id === "player" && user.dataset.points === "5"){
        const playerImage = document.querySelector('.player-image');
        const computerImage= document.querySelector('.robot-image');
        playerImage.src = './images/playerWon.jpg';
        computerImage.src = './images/robotLost.png';
    }

    if (user.id === 'computer' && user.dataset.points === "5"){
        const playerImage = document.querySelector('.player-image');
        const computerImage= document.querySelector('.robot-image');
        playerImage.src = './images/playerLost.jpg';
        computerImage.src = './images/robotWon.png';
    }
}



export { winnerImageChange, capitalizeFirstLetter, resultsDisplay, winnerDisplay, pointsAddition };
