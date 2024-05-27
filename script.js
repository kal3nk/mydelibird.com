//-------------------------------------------consts----------------------------------------------------------------
const healthSpan = document.querySelector('#health');
const happinessSpan = document.querySelector('#happiness');
const feedButton = document.querySelector('#feed');
const playButton = document.querySelector('#play');
const delibirdSkin = document.querySelector('#delibird');




//-------------------------------------------lets------------------------------------------------------------------
let health = 100;
let happiness = 100;




//--------------------------------------------functions------------------------------------------------------------
function updateStatus() {
    healthSpan.textContent = health;
    happinessSpan.textContent = happiness;
    checkPetStatus();
}

function checkPetStatus() {
    if (health <= 0 || happiness <= 0) {
        health = 0;
        happiness = 0;
        alert("Oh no! Delibird has fainted, reload to play again!");
        feedButton.disabled = true;
        playButton.disabled = true;
        delibirdSkin.disabled = true;
    }
}

function interactionFeed() {
    if (health < 101) {
        health += 10;
        if (health > 100) {
            health = 100;
        }
        updateStatus();
    }
}

function interactionPlay() {
    if (happiness < 101) {
        happiness += 10;
    }
    if (happiness > 100) {
        happiness = 100;
    }
    if(health > 0) {
        health -= 5; // Spelen zorgt voor een vermoeide Delibird
    }
    updateStatus();
}

function decreaseHappiness () {
    if (happiness > 0) {
        happiness -= 1;
        updateStatus();
    }
}


/* 
Background music control code gemaakt met hulp van:
How to play MP3 in the background music automatically? (2019, 23 augustus). 
The freeCodeCamp Forum. 
https://forum.freecodecamp.org/t/how-to-play-mp3-in-the-background-music-automatically/308554
*/

/* Dit is de main control function voor het gehele opvolgende rijtje van functions.
In de function zit een eventlistener waarmee als je er op klikt dan de functie toggleMusic
wordt aangewakkert. Hierin zitten de volgende twee functies ook backgroundMusic en musicButton.
*/
function initializeMusicControl() {
    musicButton.addEventListener('click', handleMusicButtonClick);
}

function handleMusicButtonClick() {
    toggleMusic(backgroundMusic, musicButton);
}

/*Toggle functie zorgt voor de twee verschillende opties, namelijk pauzeren als het afgespeeld
wordt. En afspeelt als het gepauzeerd is
*/
function toggleMusic(backgroundMusic, musicButton) {
    if (backgroundMusic.paused) {
        playMusic(backgroundMusic, musicButton);
    } else {
        pauseMusic(backgroundMusic, musicButton);
    }
}

/*
Deze function verandert de textcontent van de button, of te wel, als je de pauseMusic/playMusic function
aanwakkert wordt er een update gestuurd naar de updateButtonText en verandert dus de text in de button.
*/
function updateButtonText(button, text) {
    button.textContent = text;
}

//Met deze functie kan je als je music button aanklikt de muziek afspelen
function playMusic(backgroundMusic, musicButton) {
    backgroundMusic.play();
    updateButtonText(musicButton, 'Pause Music');
}

//Met deze functie kan je als je music button aanklikt de muziek pauzeren
function pauseMusic(backgroundMusic, musicButton) {
    backgroundMusic.pause();
    updateButtonText(musicButton, 'Play Music');
}



//-------------------------------Event Listeners------------------------------------------------------------

// Interaction met Delibird (play & feed)
feedButton.addEventListener('click', interactionFeed);
playButton.addEventListener('click', interactionPlay);

// Decrease Happiness mechanic, elke halve seconde gaat er 1% happiness af.
setInterval(decreaseHappiness, 500);

// Met deze event listener kan je een skin selecteren in 'My Delibird'
document.querySelector('#selectSkin').addEventListener('change', (e) => {
    delibirdSkin.src = e.target.value;
});

// Met deze event listener zorg je er voor dat de initialize music control function werkt
document.addEventListener("DOMContentLoaded", function() {
    initializeMusicControl();
});

// Automatische update voor health/happiness procenten
updateStatus();