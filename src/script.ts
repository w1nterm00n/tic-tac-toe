import animation from "./modules/animation.js";
import game from "./modules/game.js";

animation.inputAnimation();

let startButton = document.getElementById('start_btn') as HTMLButtonElement;

startButton.addEventListener('click', function(event: MouseEvent): void {
    event.preventDefault();
    game.start();
});
