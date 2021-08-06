function computerPlay () {
    const choices = ['Rock', 'Paper', 'Scissors']
    const randomIndex = Math.floor(Math.random() * 3)

    return choices[randomIndex]
}

function playRound (playerSelection, computerSelection) {
    if (playerSelection.toLowerCase() === "rock" && computerSelection === "Scissors"){
        console.log("You Win! Rock beats Paper!") 
        return true
    }

    if (playerSelection.toLowerCase() ===  "scissors" && computerSelection === "Paper"){
        console.log("You Win! Scissors beats Paper!")
        return true
    }

    if (playerSelection.toLowerCase() ===  "paper" && computerSelection === "Rock"){
        console.log("You Win! Paper beats Rock!")
        return true 
    }

    if (playerSelection.toLowerCase() === "rock" && computerSelection === "Paper"){
        console.log("You Lose! Paper beats Rock!")
        return false
    }

    if (playerSelection.toLowerCase() === "scissors" && computerSelection === "Rock"){
        console.log("You Lose! Rock beats Scissors!")
        return false
    }

    if (playerSelection.toLowerCase() === "paper" && computerSelection === "Scissors"){
        console.log("You lose! Scissors beats Paper!")
        return false
    }
    
    if (playerSelection.toLowerCase() === computerSelection.toLowerCase()){
        console.log(`A draw! You both picked ${computerSelection}`)
    }
}

function game() {
    let round = 1
    let playerPoints = 0
    let computerPoints = 0

    while (round <= 5){

        let playerSelection = prompt("Please type in Rock, Paper or Scissors: ")
        let computerSelection = computerPlay()
        console.log(playerSelection)
        console.log(computerSelection)
        
        let roundResult = playRound(playerSelection, computerSelection)
        
        if (roundResult === true){
            playerPoints++
        }

        else if (roundResult === false){
            computerPoints++
        }
        round++
    
    }

    if (playerPoints > computerPoints){
        console.log("Congratulations you won the game!")
    }

    else if (computerPoints > playerPoints){
        console.log("Oh no the computer wone the game!")
    }

    else{
        console.log("Looks like the game ended in a draw!")
    }
    

}

game()
