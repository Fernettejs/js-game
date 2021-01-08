const character = document.getElementById("character");
const block = document.getElementById("block");
const dash = document.getElementById("dash");

const startDate = new Date();
const startButton = document.getElementById('start');

const startTime = Math.round(startDate.getTime() / 1000); //start time for alert

// Moving right and left with arrow keys

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

    if (e.keyCode == '37') {
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


    if (blockBottom < 150 && blockBottom > 50 && ((blockLeft + 80)  > characterLeft && blockLeft < (characterLeft + 80))
        ){
        block.style.animation = 'none';
        block.style.display = 'none';

        const endDate = new Date();
        const endTime = Math.round(endDate.getTime() / 1000); //end time for alert
        const timeAlive = endTime - startTime;


        if (timeAlive < 15) {
            alert(`You crashed! You only lasted ${timeAlive} SECONDS. We have accident forgiveness though! Try again.`);
        } else {
            alert(`You made it over 15 seconds! Now you get 15% off! Your code is DISCOUNT15`)
        }
        document.location.reload(); //restart game automatically when alert is cleared. 
        // clearInterval(interval); // Needed for Chrome to end game
    }

}, 10);

// Seconds not crashed counter

let seconds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    el.innerText = "You haven't crashed for " + seconds + " seconds.";
}

var cancel = setInterval(incrementSeconds, 1000);
