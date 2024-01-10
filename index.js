const grid = document.getElementById("grid");
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
    console.log(tempArea);
}

function onSelect(button) {
   swapPlaces(button, document.getElementById("space"));
}
function generateButton(text){
    let newButton = document.createElement("button");
    newButton.className = "numberButton";
    newButton.id = `${text}`;
    if(text != "space"){
        newButton.innerText = `${text}`;
        newButton.style.gridRow = Math.trunc(Number.parseInt(text) / 4 + 1);
        newButton.style.gridColumn;
        console.log(Math.trunc(Number.parseInt(text) / 4));
    } else {
        newButton.style.gridColumn = 4
        newButton.style.gridRow = 4
    }
    
    return newButton;
}

initialize();