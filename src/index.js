import Game from "./scripts/game";


const observer = new IntersectionObserver((entries)=>{
    console.log(entries)
    entries.forEach((entry) =>{

        if(entry.isIntersecting) entry.target.classList.add('show');
        
        else entry.target.classList.remove('show')

    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const canvas = document.getElementById("sandbag-game");
//canvas.setAttribute("width", window.innerWidth);
let game = new Game(canvas);
game.play();

window.addEventListener('keydown', (event) => game.convertKeydown(event.key))
window.addEventListener('keyup', (event) => game.convertKeyRelease(event.key))

window.addEventListener('click', () => game.convertLeftClick());

//game.readUserInput.bind(game));




