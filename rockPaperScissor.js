let userScore=0;
let compScore=0; //score is 0 at first

const textToPrint ="Welcome to Rock Paper Scissors, the classic hand game of strategy and chance!  In this game, you will go head-to-head with the computer, and the winner is determined by the classic rules, test your luck against the computer. Let the battle begin!";
const printedTextElement = document.getElementById("printed-text");
let charIndex=0;
const buttonElement = document.querySelector('.gameStarter');
const gameIntroContainer = document.querySelector(".gameIntro");
const startBtn = document.querySelector("#startbutton");
const resetBtn = document.querySelector("#resetBtn");
const choices = document.querySelectorAll(".choice");
const messageP = document.querySelector("#msg");
const userScorePara =document.querySelector("#userScore");
const compScorePara =document.querySelector("#compScore");
const score10 = document.getElementById("10");
const score15 = document.getElementById("15");
const score20 = document.getElementById("20");
const scores = document.querySelectorAll(".scrBtn");
const selectScore = document.querySelector(".selectScore");
const scoreSheet = document.querySelector(".winners");
const userW = document.querySelector(".winP");
const userL = document.querySelector(".loseP");

let gameStarted = false;

//button eventListener
startBtn.addEventListener("click",()=>{ //start button
    startGame();
})
resetBtn.addEventListener("click",()=>{ //reset button
    
    scoreReset();
});
//closing the score selector
scores.forEach((score)=>{
    score.addEventListener("click",()=>{
        scoreSelected = parseInt(score.getAttribute("id"));
        selectScore.style.display="none";
    });
});

//new  function
choices.forEach((choice)=>{
    choice.addEventListener('click',()=>{
        try {
            const userChoice = choice.getAttribute('id');   //user choices
        // console.log("User clicked ", userChoice);
        playGame(userChoice);
        } catch (error) {
            console.error(`Error handling user choice: ${error}`);
            messageP.innerText = `Error: ${error.message}`;
            messageP.style.backgroundColor = "red";
        }
        
    });
});


//intro
function printText() {
    if (charIndex < textToPrint.length) {

        try {
            printedTextElement.textContent += textToPrint[charIndex];
        charIndex++;
        setTimeout(printText,30);
        } catch (error) {
            console.error(`Error printing text: ${error}`);
        }
    }else {
        setTimeout(() => { buttonElement.classList.remove(".gameStarter");
            buttonElement.classList.add('animate'); 
             gameStarters = document.querySelector(".animate");
            gameStarters.addEventListener("click",()=>{
                gameIntroContainer.style.display= "none";
            });
        }, 1000);// show the button after the text is fully printed
    }
}
setTimeout(() => {
    printText();
}, 1000);

//scoresheet
const scoreSheetShow = (userScore,compScore,scoreSelected)=>{
    if (userScore == scoreSelected) {
        scoreSheet.style.display="flex";
        userW.style.display="block";
        setTimeout(() => {
            scoreSheet.style.display="none";
            userW.style.display="none";
        },3000);
    }
    if (compScore == scoreSelected) {
        scoreSheet.style.display="flex";
        userL.style.display="block";
        setTimeout(() => {
            scoreSheet.style.display="none";
            userL.style.display="none"; 
        },3000);
    }
}

const scoreReset = ()=>{
    compScore=0;
    userScore=0;
    userScorePara.innerText="0";
    compScorePara.innerText="0";
    messageP.innerText=`THE GAME IS STARTED `;
    messageP.style.backgroundColor="#081b31";
}

//start game function
const startGame=()=>{
    if ( gameIntroContainer.style.display!=="none") {
            gameStarters.style.transform= "translateY(2px)";
    } else {
        scoreReset();
        gameStarted =true;
        messageP.innerText="THE GAME IS STARTED";
        messageP.style.backgroundColor = "#081b31";
        selectScore.style.display="flex";
    }
   
}

const genCompChoice =()=>{
    //rock paper scissors
    const option =["rock","paper","scissors"];
    try {
        const op=Math.floor(Math.random()*3);
    return option[op];
    } catch (error) {
        console.error(`Error generating computer choice: ${error}`);
    return null; // or some default value
    } 
}

//for draw game
const drawGame=(userChoice)=>{
    messageP.innerText=`THE GAME IS DRAW BOTH SELECTED ${userChoice.toUpperCase()}`;
    messageP.style.backgroundColor="blue";
}

//for showin the winner
const showWinner =(userWin,userChoice,compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;       // to check if userwin is true or not
        try {
            messageP.innerText =`YOU WON YOUR ${userChoice.toUpperCase()} BEATS COMPUTER ${compChoice.toUpperCase()}`;
            messageP.style.backgroundColor="green";
        } catch (error) {
            console.error(`Error showing winner: ${error}`);
            messageP.innerText = `Error: ${error.message}`;
            messageP.style.backgroundColor = "red"
        }
        if (userScore == scoreSelected) {
            scoreSheetShow(userScore,null,scoreSelected);
            scoreReset();
            gameStarted=false;
        }
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        messageP.innerText =`YOU LOST COMPUTER ${compChoice.toUpperCase()} BEATS YOUR ${userChoice.toUpperCase()}`;
        messageP.style.backgroundColor="red";
        if (compScore == scoreSelected) {
            scoreSheetShow(null,compScore,scoreSelected);
            scoreReset();
            gameStarted=false;
        }
    }
}//end showWinner


    
//function playgame
const playGame=(userChoice)=>{
    if (!gameStarted) {
        messageP.innerText = "Click the Start Game button to begin!";        //function for playing the game
        messageP.style.backgroundColor = "orange";
        return;
    }
    try {
         //to generate computer choice 
    const compChoice = genCompChoice();
    if(userChoice === compChoice){  //for point calculation
       //Draw game
       drawGame(userChoice);
   }
   else{
       let userWin = true;
       if (userChoice==="rock" ) {
           // computer can choose either paper or scissor
          userWin= compChoice==="paper"? false: true;

       }else if (userChoice === "paper") {
            // computer can choose either rock or scissor
           userWin= compChoice === "scissors"? false:true;         //checking user and computer choices
       }
       else{
           // computer can choose either rock or paper
           userWin=compChoice === "rock"?false:true;
       }

       showWinner(userWin,userChoice,compChoice);    //function for checking who is the winner which takes the argument userWin to check true or not
   }
        
    } catch (error) {
        console.error(`Error playing game: ${error}`);
        messageP.innerText = `Error: ${error.message}`;
        messageP.style.backgroundColor = "red";
    }
   
}

//function playgame end
