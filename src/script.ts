import animation from "./modules/animation.js";
import game from "./modules/game.js";

animation.inputAnimation();

let startButton = document.getElementById('start_btn');

startButton.addEventListener('click', function(event){
    event.preventDefault();
    game.start();
});
