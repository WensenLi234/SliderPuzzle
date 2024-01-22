const grid = document.getElementById("grid");
const resetButton = document.getElementById("reset");
const startButton = document.getElementById("start");
const scoreText = document.getElementById("scoreNum");
const totalPieces = 16;
let score = 0;
let gameStarted = false;

// util functions

/*
    Gets grid area formatted in an Number[]
    [row, column]
*/
function getGridArea(element) {
    let array = element.style.gridArea.split(" / ");
    return [Number.parseInt(array[0]), Number.parseInt(array[1])];
}

// game functions

function initialize(){
    for(i = 1; i <= totalPieces - 1; i++) {
        grid.appendChild(generateButton(i));
    }
    grid.appendChild(generateButton("space"))
    const buttons = Array.from(grid.getElementsByClassName("numberButton"))
    buttons.forEach(button => {
        button.addEventListener("click", (button) => onSelect(button.target));
    })
    resetButton.addEventListener("click", reset);
    startButton.addEventListener("click", toggleGameStarted);
}

function reset() {
    Array.from(grid.getElementsByClassName("numberButton")).forEach(button => {
        if(button.id != "space") {
            let number = Number.parseInt(button.id);
            button.style.gridRow = Math.trunc((number - 1) / 4 + 1);
            button.style.gridColumn = number - ((Number.parseInt(button.style.gridRow) - 1) * 4);
        } else {
            button.style.gridArea = "4 / 4";
        }
    })
}

function update() {
    scoreText.textContent = score;
}

function checkForCompletion(){
    let gameWon = true;
    Array.from(grid.getElementsByClassName("numberButton")).forEach(button => {
        if(button.id != "space") {
            let number = Number.parseInt(button.id);
            let gridArea = getGridArea(button);
            if(gridArea[0] != Math.trunc((number - 1) / 4 + 1) 
            || gridArea[1] != number - ((Number.parseInt(button.style.gridRow) - 1) * 4)){
                gameWon = false;
            }
        } else {
            if(document.getElementById("space").style.gridArea != "4 / 4"){
                gameWon = false;
            }
        }
    })
    return gameWon;
}

function onGameWin(){
    document.getElementById("winTextContent").textContent = "You Win!";
}

function swapPlaces(buttonOne, buttonTwo) {
    let tempArea = buttonOne.style.gridArea;
    buttonOne.style.gridArea = buttonTwo.style.gridArea;
    buttonTwo.style.gridArea = tempArea;
}

function onSelect(button) {
    let buttonArea = getGridArea(button);
    let spaceArea = getGridArea(document.getElementById("space"));
    if((buttonArea[0] == spaceArea[0] && (buttonArea[1] - 1 == spaceArea[1] || buttonArea[1] + 1 == spaceArea[1]))
    || (buttonArea[1] == spaceArea[1] && (buttonArea[0] - 1 == spaceArea[0] || buttonArea[0] + 1 == spaceArea[0]))) {
            swapPlaces(button, document.getElementById("space"));
        }
    if(gameStarted){
        incrementScore();
        if(checkForCompletion()){
            onGameWin();
        }
        update();
    }
}

function generateButton(text){
    let newButton = document.createElement("button");
    newButton.className = "numberButton";
    newButton.id = `${text}`;
    if(text != "space"){
        // equation: row * 4 + column = buttonNumber where column <= 4,  buttonNumber <= 16
        // column = buttonNumber - row * 4
        newButton.innerText = `${text}`;
        newButton.style.gridRow = Math.trunc((Number.parseInt(text) - 1) / 4 + 1);
        newButton.style.gridColumn = Number.parseInt(text) - ((Number.parseInt(newButton.style.gridRow) - 1) * 4);
    } else {
        newButton.style.gridArea = "4 / 4";
    }
    newButton.style.backgroundColor = "blue";
    return newButton;
}

function toggleGameStarted() {
    gameStarted = !gameStarted;
}

function incrementScore() {
    score ++;
}
initialize();