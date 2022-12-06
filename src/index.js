import Game from "./scripts/game";


const canvas = document.getElementById("sandbag-game");
//canvas.setAttribute("width", window.innerWidth);
let game = new Game(canvas);
game.play();

window.addEventListener('keydown', (event) => game.convertKeydown(event.key))
window.addEventListener('keyup', (event) => game.convertKeyRelease(event.key))

window.addEventListener('click', () => game.convertLeftClick());

//game.readUserInput.bind(game));