import Game from "./scripts/game";


const canvas = document.getElementById("sandbag-game");
canvas.setAttribute("width", window.innerWidth);
let game = new Game(canvas);
game.play();

window.addEventListener('keydown', (event) => game.beginMovement(event.key))
window.addEventListener('keyup', (event) => game.endMovement())

window.addEventListener('mousedown', () => game.convertLeftClick());

//game.readUserInput.bind(game));