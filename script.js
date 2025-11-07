const weapons = document.querySelectorAll("#weapons > div");
const win = document.getElementById("resW");
const lose = document.getElementById("resL");
const draw = document.getElementById("resD");
const winningText = document.getElementById("winningText");
const again = document.getElementById("again");
const lower = document.getElementById("lower");
const lower2 = document.getElementById("lower2");
const hands = document.getElementById("hands");
const playerHand = document.getElementById("playerHand");
const compHand = document.getElementById("compHand");
const choices = ["rock", "paper", "scissor"];

// Game state variables
let scores = { win: 0, lose: 0, draw: 0 };
let currentRound = 0;
let totalRounds = 0;
let gameFinished = false;

// DOM Elements
const roundsSelection = document.getElementById("rounds-selection");
const roundOptions = document.querySelectorAll(".round-option");
const upper = document.getElementById("upper");
const results = document.getElementById("results");

// Game info display
const gameInfo = document.createElement("div");
gameInfo.id = "game-info";
gameInfo.innerHTML = `Round: <span id="current-round">1</span>/<span id="total-rounds">0</span>`;
document.body.appendChild(gameInfo);
gameInfo.classList.add('hidden');

// Round selection event listeners
roundOptions.forEach(option => {
    option.addEventListener("click", () => {
        // Remove selected class from all options
        roundOptions.forEach(opt => opt.classList.remove("selected"));
        // Add selected class to clicked option
        option.classList.add("selected");
        
        totalRounds = parseInt(option.dataset.rounds);
        currentRound = 0;
        scores = { win: 0, lose: 0, draw: 0 };
        gameFinished = false;
        
        // Hide rounds selection and show game
        roundsSelection.classList.add("hidden");
        upper.classList.remove("hidden");
        lower.classList.remove("hidden");
        results.classList.remove("hidden");
        
        // Show game info
        gameInfo.classList.remove("hidden");
        updateGameInfo();
        
        // Reset score display
        resW.textContent = "0";
        resL.textContent = "0";
        resD.textContent = "0";
    });
});

function updateGameInfo() {
    document.getElementById("current-round").textContent = currentRound;
    document.getElementById("total-rounds").textContent = totalRounds;
}

function checkGameEnd() {
    if (currentRound >= totalRounds) {
        gameFinished = true;
        let finalMessage = "";
        
        if (scores.win > scores.lose) {
            finalMessage = `🎉 You won the game! ${scores.win}-${scores.lose} `;
        } else if (scores.lose > scores.win) {
            finalMessage = `😢 Computer won the game! ${scores.lose}-${scores.win}`;
        } else {
            finalMessage = `🤝 It's a tie game! ${scores.win}-${scores.lose} `;
        }
        
        winningText.textContent = finalMessage;
        winningText.classList.remove("hidden");
        
        again.innerHTML = '<i class="fa-solid fa-rotate-right"></i> &nbsp;Play Again';
        again.classList.remove("hidden");
        
        return true;
    }
    return false;
}

// Function to reset hands to fists
function resetHandsToFists() {
    playerHand.innerHTML = '<i class="fa-solid fa-hand-fist"></i>';
    compHand.innerHTML = '<i class="fa-solid fa-hand-fist"></i>';
}

// When clicking your weapon
weapons.forEach(weapon => {
    weapon.addEventListener("click", () => {
        if (gameFinished) return;
        
        currentRound++;
        updateGameInfo();
        
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        const playerChoice = weapon.dataset.choice;
        
        // Reset hands to fists before starting new round
        resetHandsToFists();
        
        // Hide weapon selection and show battle section
        lower.classList.add("hidden");
        lower2.classList.remove("hidden");
        
        // Hide winning text and play again button during animation
        winningText.classList.add("hidden");
        again.classList.add("hidden");
        
        // Start shaking animation with fists
        hands.classList.add("shaking");

        setTimeout(() => {
            // Remove shake
            hands.classList.remove("shaking");

            // Show choices
            playerHand.innerHTML = getHandIcon(playerChoice);
            compHand.innerHTML = getHandIcon(computerChoice);

            // Determine winner
            const result = winner(playerChoice, computerChoice);
            let roundMessage = "";
            
            if (result === "Draw") {
                roundMessage = `Round ${currentRound}: It's a Draw!`;
                scores.draw++;
            } else if (result === "player") {
                roundMessage = `Round ${currentRound}: You Won! 🎉`;
                scores.win++;
            } else {
                roundMessage = `Round ${currentRound}: Computer Wins! 😢`;
                scores.lose++;
            }

            // Update scoreboard
            resW.textContent = scores.win;
            resL.textContent = scores.lose;
            resD.textContent = scores.draw;

            // Check if game ended
            const gameEnded = checkGameEnd();
            
            if (!gameEnded) {
                // Show round result and next round button
                winningText.textContent = roundMessage;
                winningText.classList.remove("hidden");
                again.innerHTML = '<i class="fa-solid fa-forward"></i> &nbsp;Next Round';
                again.classList.remove("hidden");
            }
            // If game ended, checkGameEnd() already shows the final message and play again button

        }, 1000);
    });
});

function getHandIcon(choice) {
    if (choice === "rock") return '<i class="fa-solid fa-hand-back-fist"></i>';
    if (choice === "paper") return '<i class="fa-solid fa-hand"></i>';
    if (choice === "scissor") return '<i class="fa-solid fa-hand-scissors"></i>';
}

// To identify winner
function winner(player, computer) {
    if (player === computer) {
        return "Draw";
    }
    if (player === "rock" && computer === "scissor" || 
        player === "scissor" && computer === "paper" || 
        player === "paper" && computer === "rock") {
        return "player";
    } else {
        return "Computer";
    }
}

// To play again or continue to next round
again.addEventListener("click", () => {
    if (gameFinished) {
        // Reset entire game 
        resetHandsToFists();
        winningText.classList.add("hidden");
        lower2.classList.add("hidden");
        again.classList.add("hidden");
        upper.classList.add("hidden");
        lower.classList.add("hidden");
        results.classList.add("hidden");
        gameInfo.classList.add("hidden");
        
        // Show rounds selection again
        roundsSelection.classList.remove("hidden");
        gameFinished = false;
    } else {
        // Continue to next round
        resetHandsToFists();
        winningText.classList.add("hidden");
        lower2.classList.add("hidden");
        again.classList.add("hidden");
        lower.classList.remove("hidden");
    }
});