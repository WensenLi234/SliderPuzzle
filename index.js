const grid = document.getElementById("grid");
// util functions

/*[
    Gets grid area formatted in an Number[]
    [row, column]
*/
function getGridArea(element) {
    let array = element.style.gridArea.split(" / ");
    return [Number.parseInt(array[0]), Number.parseInt(array[1])];
}
// game functions

function initialize(){
    for(i = 1; i <= 15; i++) {
        grid.appendChild(generateButton(i));
    }
    grid.appendChild(generateButton("space"))
    const buttons = Array.from(grid.getElementsByClassName("numberButton"))
    buttons.forEach(button => {
        button.addEventListener("click", (button) => onSelect(button.target));
    })
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
        newButton.style.gridColumn = 4
        newButton.style.gridRow = 4
    }
    return newButton;
}

initialize();