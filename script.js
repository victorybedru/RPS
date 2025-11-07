const weapons=document.querySelectorAll("#weapons > div");
const win= document.getElementById("resW");
const lose= document.getElementById("resL");
const draw= document.getElementById("resD");
const winningText= document.getElementById("winningText");
const again= document.getElementById("again");
const lower = document.getElementById("lower");
const lower2 = document.getElementById("lower2");
const hands = document.getElementById("hands");
const compHand = document.getElementById("compHand");
const choices= ["rock", "paper", "scissor"];
let scores= {win:0, lose:0, draw:0};

//when clicking ur weapon
weapons.forEach(weapon=>{
    weapon.addEventListener("click", ()=>{
        const computerChoice= choices[Math.floor(Math.random()*3)];
        const playerChoice= weapon.dataset.choice;
        //to hide the lower div and display the new one
        lower.style.display="none";
        lower2.style.display="flex";
        //to diplAYa the fists of the comp and player
        hands.classList.add("shaking");
    
        setTimeout(() => {
            
            // Remove shake
            hands.classList.remove("shaking");

            // Show choices
            playerHand.innerHTML = getHandIcon(playerChoice);
            compHand.innerHTML = getHandIcon(computerChoice);
           
            

            // Determine winner
            const result = winner(playerChoice, computerChoice);
            if(result==="Draw") {
                winningText.textContent = "It's a Draw!";
                scores.draw++;
            } else if(result==="player") {
                winningText.textContent = "You Won! 🎉";
                scores.win++;
            } else {
                winningText.textContent = "Computer Wins! 😢";
                scores.lose++;
            }

            // Update scoreboard
            resW.textContent = scores.win;
            resL.textContent = scores.lose;
            resD.textContent = scores.draw;

            winningText.style.display = "block";
            again.style.display = "block";

        }, 1000);



    });


});
function getHandIcon(choice){
    if(choice==="rock") return '<i class="fa-solid fa-hand-back-fist"></i>';
    if(choice==="paper") return '<i class="fa-solid fa-hand"></i>';
    if(choice==="scissor") return '<i class="fa-solid fa-hand-scissors"></i>';
}
//to identify winner
function winner(player, computer){
    if(player===computer){
        return "Draw";

    }
    if( player==="rock" && computer==="scissor" || player==="scissor" && computer==="paper"|| player==="paper" && computer==="rock"){

        return "player";
    }
    else{
       
        return "Computer";
    }
    
}
//to play again
again.addEventListener("click", ()=>{
    winningText.style.display= "none";
    lower2.style.display= "none";
    again.style.display= "none";
    lower.style.display= "flex";

})
;