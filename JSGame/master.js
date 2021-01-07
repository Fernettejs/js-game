const character = document.getElementById("character");
const block = document.getElementById("block");
const dash = document.getElementById("dash");

const startButton = document.getElementById('start');


// function right() {
//     character.classList.add("animate")
//     setTimeout(function(){
//         character.classList.remove("animate")
//     }, 2000);
// }

function rightMore() {
    if (character.classList != 'rightMore') {
    character.classList.add('rightMore')
    }
    setTimeout(function(){
        character.classList.remove("rightMore")
    }, 1000);
}

function leftMore() {
    if (character.classList != 'leftMore') {
        character.classList.add('leftMore')
        }    
    setTimeout(function(){
        character.classList.remove("leftMore")
    }, 1000);
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
        return leftMore();
    }
    else if (e.keyCode == '39') {
        return rightMore();
    }
};

// Random block placement

function animation() {
    block.style.WebkitAnimation = "block 2s infinite linear;"; // Code for Chrome, Safari and Opera
    block.style.animation = "block 2s infinite linear;";     // Standard syntax
};

block.addEventListener("animationstart", blockPlacement);

function blockPlacement() {
    const placement = Math.floor(Math.random() * 500);
    block.style.left = placement + "px";
};

// Start game

function startRound() {
    animation();
    blockPlacement();
}
  
block.addEventListener("animationiteration", blockPlacement);

startButton.onclick = () => {
    startRound();
};

// Dead check

const deadCheck = setInterval(function() {
    const characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    const blockBottom = parseInt(window.getComputedStyle(block).getPropertyValue("bottom"));
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    console.log(characterLeft)
    console.log(blockLeft)
    console.log(blockBottom)


    if (blockBottom < 200 && blockBottom > 100 && ((blockLeft + 50)  > characterLeft && blockLeft < (characterLeft + 50))
        ){
        block.style.animation = 'none';
        block.style.display = 'none';

        alert("loser")
    }
}, 10);