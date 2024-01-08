const buttonTemplate = "<button class=\"numberButton\" id=\"temp\">temp</button>";
const grid = document.getElementById("grid");
function initialize(){
    for(i = 1; i <= 15; i++) {
        grid.appendChild(generateButton(i));
    }
    grid.appendChild(generateButton("space"))
}
function generateButton(text){
    let newButton = document.createElement("button");
    newButton.className = "numberButton";
    newButton.id = `${text}`;
    if(text != "space"){
        newButton.innerText = `${text}`;
    }
    return newButton;
}
initialize();