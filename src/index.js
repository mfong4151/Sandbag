import Game from "./scripts/game";


const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry) =>{

        if(entry.isIntersecting) entry.target.classList.add('show');
        
        else entry.target.classList.remove('show')

    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const toggleMusic = document.getElementById("mute-button"), restartButton = document.getElementById("restart-button"), canvas = document.getElementById("sandbag-game");
const backgroundMusic = document.createElement("audio");
backgroundMusic.src = "./assets/sound/galdin_quay.mp3";
backgroundMusic.volume = 0.5;
let musicStarted = false;
//backgroundMusic.play();


let game = new Game(canvas);
game.play();

window.addEventListener('keydown', (event) => game.convertKeydown(event.key))
window.addEventListener('keyup', (event) => game.convertKeyRelease(event.key))
window.addEventListener('keydown', e=> {if(e.keyCode=== 32) e.preventDefault()})
window.addEventListener('click', () => game.convertLeftClick());

toggleMusic.addEventListener("click", ()=>{
    if(!musicStarted){
        backgroundMusic.play();
        musicStarted = true;
    }else if (musicStarted && backgroundMusic.volume !== 0){
        backgroundMusic.volume = 0;
    }else {
        backgroundMusic.volume = 0.5;
    } 
})

restartButton.addEventListener("click", ()=>{
    game.reset();
})