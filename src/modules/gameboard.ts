import animation from "./animation.js";
import game from "./game.js";
import players from "./players.js";
import { Tag } from "./state.js";
import { Player, state } from "./state.js";

interface Gameboard {
    gameboardArray: HTMLElement[][];
    createArray: (this: Gameboard) => NodeListOf<HTMLElement>;
    tagging: (this: Gameboard, whoseTurn: Tag, cell: HTMLElement) => void;
    showWhoseTurn: () => void;
    showWinner: () => void;
}

let gameboard: Gameboard = {
    gameboardArray: [],

    createArray: function(this: Gameboard): NodeListOf<HTMLElement> {
        let cells = document.querySelectorAll('.cell') as NodeListOf<HTMLElement>;
        let cellArray: HTMLElement[] = Array.from(cells);
        for (let i = 0; i < 3; i++) {
            this.gameboardArray.push(cellArray.slice(i * 3, (i + 1) * 3));
        }
        return cells;   //cells is a nodelist
    },

    tagging: function (this: Gameboard, whoseTurn: Tag, cell: HTMLElement): void {
            //searching for index of the cell in gameboardArray
            let rowIndex = this.gameboardArray.findIndex(row => row.includes(cell));
            let columnIndex = this.gameboardArray[rowIndex].indexOf(cell); 
            //found index of the cell in gameboardArray

        if (this.gameboardArray[rowIndex][columnIndex].dataset.value) {
            alert ("its already clicked!");
        } else {
            cell.classList.add(whoseTurn === "X" ? "Xcell" : "Ocell");
            this.gameboardArray[rowIndex][columnIndex].dataset.value = whoseTurn;
            game.processOfGame();
        };
    },

    showWhoseTurn: function(): void { //showing whose turn (name of player)
        const whoseTurnName: string = 
        (players.player0.tag === state.whoseTurn ? players.player0.name : players.playerX.name)
         ?? "Unknown";

        let turn = document.querySelector('.turn') as HTMLElement;
        turn.style.opacity = "0";
        setTimeout(() => {
            turn.textContent = whoseTurnName + " turn!";
            turn.style.opacity = "1";
          }, 300);
    },

    showWinner: function(): void {
        let winnerName: Player["name"];
        if (players.player0.tag === game.winnerTag) {
            winnerName = players.player0.name;
        } else {
            winnerName = players.playerX.name;
        }
        let congratsTable = document.querySelector('.congrats_table') as HTMLElement;
        congratsTable.style.cssText = 'display: flex;';
        let congrats = document.querySelector('.congrats') as HTMLElement;
        congrats.textContent =  winnerName + " won";
        animation.showConfetti();
        let restartButton = document.querySelector('#restart_btn') as HTMLElement;

        restartButton.addEventListener('click', function(){
            game.restart();
        }); 
    }

};

export default gameboard;