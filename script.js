let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetBtn');
let newBtn = document.querySelector('#newBtn');
let msgContainer = document.querySelector('.msg-container');
let Container = document.querySelector('.container');
let msg = document.querySelector('#msg');
let mainGame = document.querySelector('.main-game');

//For players
let turnO = true;

//Winning Patters for Tic Tac Toe
const winPatterns = [
    [0, 1, 2],  // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],  // diagonals
    [2, 4, 6]
];

//Add Event Listeners to each individual boxes
boxes.forEach((box) => {
    box.addEventListener('click',()=>{
        console.log('Button was clicked.');
        if(turnO){
            box.innerText = 'O';
            turnO = false;
        }else{
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled = true;

        checkWinner();

    });
});

//Check Winner function
const checkWinner = () => {
    for( let pattern of winPatterns ){
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText; 
            let pos3Val = boxes[pattern[2]].innerText;

            if(pos1Val != '' && pos2Val != '' && pos3Val != ''){
                if( pos1Val === pos2Val && pos2Val === pos3Val ){
                    console.log(`Winner is ${pos1Val} !`);

                    showWinner( pos1Val );
                    return; // stop further checks
                }
            }
    }

    // If no winner and all boxes are filled, it's a draw
    const allFilled = Array.from(boxes).every(box => box.innerText !== '');
    if(allFilled){
        showDraw();
    }
};


//Show the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulation ! Winner is ${winner}.`;
    // ensure the background shows the win illustration
    msgContainer.style.backgroundImage = 'url("win.svg")';
    msgContainer.classList.remove('hide');
    // hide the main game so only the message and New Game button remain
    mainGame.classList.add('hide');
    disabledBoxes();
}

//Show draw (no winner)
const showDraw = () => {
    msg.innerText = `It's a draw!`;
    // ensure the background shows the draw illustration
    msgContainer.style.backgroundImage = 'url("draw.svg")';
    msgContainer.classList.remove('hide');
    mainGame.classList.add('hide');
    disabledBoxes();
}

//Reset Game
const resetGame = () =>{
    turnO = true;
    // show the main game and hide the winner message
    mainGame.classList.remove('hide');
    msgContainer.classList.add('hide');
    // clear any inline background so CSS default or future setting applies
    msgContainer.style.backgroundImage = '';
    enabledBoxes();
}

//Disable all the boxes after someone wins
const disabledBoxes = () => {
    for( let box of boxes ){
        box.disabled = true;
    }
    // ensure main game is hidden
    mainGame.classList.add('hide');
}

//Enable all the boxes after RESET
const enabledBoxes = () => {
    // hide the winner message once before re-enabling the board
    msgContainer.classList.add('hide');
    for( let box of boxes ){
        box.disabled = false;
        box.innerText = '';
    }
}

//New Game Event Listener
newBtn.addEventListener('click',resetGame);
resetBtn.addEventListener('click',resetGame);

