//-------------------------------------------consts----------------------------------------------------------------
//healthSpan en happinessSpan zijn verbonden aan de function updateStatus.
const healthSpan = document.querySelector('#health');
const happinessSpan = document.querySelector('#happiness');

//feedButton en playButton zijn verbonden aan interactionFeed/interactionPlay via eventlisteners.
const feedButton = document.querySelector('#feed');
const playButton = document.querySelector('#play');

//delibirdSkin is verbonden aan de een arrowfunction via een eventlistener.
const delibirdSkin = document.querySelector('#delibird');




//-------------------------------------------lets------------------------------------------------------------------
//health en happiness zijn verbonden aan de healthSpan/happinessSpan via de updateStatus function.
let health = 100;
let happiness = 100;




//--------------------------------------------functions------------------------------------------------------------
/* 
updateStatus zorgt ervoor dat de de healthSpan/happinessSpan is verbonden met de health en 
happiness let elementen. Hier is het ook meteen verbonden met de checkPetStatus function.
*/
function updateStatus() {
    healthSpan.textContent = health;
    happinessSpan.textContent = happiness;
    checkPetStatus();
}

/*
checkPetStatus kijkt naar de happiness en health van Delibird, als één/beide minder is dan of 
gelijk aan 0% is dan komt er een alert van de browser. 
Ook worden de feedButton en playButton gedisabled, of te wel je Delibird is dan "dood".
*/
function checkPetStatus() {
    if (health <= 0 || happiness <= 0) {
        health = 0;
        happiness = 0;
        alert("Oh no! Delibird has fainted, reload to play again!");
        feedButton.disabled = true;
        playButton.disabled = true;
    }
}

/*
interactionFeed vermeert health met 10% elke keer als je op de FeedButton klikt.
De functie wordt getriggerd met eventlistener "feedButton" 'click'.
*/
function interactionFeed() {
    if (health < 101) {
        health += 10;
        if (health > 100) {
            health = 100;
        }
        updateStatus();
    }
}

/*
interactionPlay vermeert happiness met 10% elke keer als je op de playButton klikt.
De functie wordt getriggerd met eventlistener "playButton" 'click'.
*/
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

/*
decreaseHappiness vermindert de happiness met 1%.
De functie wordt getriggerd met een setInterval later in de code.
*/
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


/*
Toggle functie zorgt voor de twee verschillende opties, namelijk pauzeren als het afgespeeld
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

/*
Arrow function eventlisteneres met hulp gemaakt van
Can I use an arrow function as the callback for an event listener in JavaScript? (2021, 12 juni). 
30 Seconds Of Code. 
https://www.30secondsofcode.org/js/s/arrow-function-event-listeners/
*/

// Met deze event listener kan je een skin selecteren in 'My Delibird'
document.querySelector('#selectSkin').addEventListener('change', (e) => {
    delibirdSkin.src = e.target.value;
});

//Met deze eventlistener trigger je de musicButton die er voor zorgt dat de music control functioneel is.
musicButton.addEventListener('click', () => toggleMusic(backgroundMusic, musicButton));

// Automatische update voor health/happiness procenten
updateStatus();