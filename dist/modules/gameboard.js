import animation from "./animation.js";
import game from "./game.js";
import players from "./players.js";
import { state } from "./state.js";
let gameboard = {
    gameboardArray: [],
    createArray: function () {
        let cells = document.querySelectorAll('.cell');
        let cellArray = Array.from(cells);
        for (let i = 0; i < 3; i++) {
            this.gameboardArray.push(cellArray.slice(i * 3, (i + 1) * 3));
        }
        return cells; //cells is a nodelist
    },
    tagging: function (whoseTurn, cell) {
        //searching for index of the cell in gameboardArray
        let rowIndex = this.gameboardArray.findIndex(row => row.includes(cell));
        let columnIndex = this.gameboardArray[rowIndex].indexOf(cell);
        //found index of the cell in gameboardArray
        if (this.gameboardArray[rowIndex][columnIndex].dataset.value) {
            alert("its already clicked!");
        }
        else {
            cell.classList.add(whoseTurn === "X" ? "Xcell" : "Ocell");
            this.gameboardArray[rowIndex][columnIndex].dataset.value = whoseTurn;
            game.processOfGame();
        }
        ;
    },
    showWhoseTurn: function () {
        const whoseTurnName = (players.player0.tag === state.whoseTurn ? players.player0.name : players.playerX.name)
            ?? "Unknown";
        let turn = document.querySelector('.turn');
        turn.style.opacity = "0";
        setTimeout(() => {
            turn.textContent = whoseTurnName + " turn!";
            turn.style.opacity = "1";
        }, 300);
    },
    showWinner: function () {
        let winnerName;
        if (players.player0.tag === game.winnerTag) {
            winnerName = players.player0.name;
        }
        else {
            winnerName = players.playerX.name;
        }
        console.log("winner: ", winnerName);
        let congratsTable = document.querySelector('.congrats_table');
        congratsTable.style.cssText = 'display: flex;';
        let congrats = document.querySelector('.congrats');
        congrats.textContent = winnerName + " won";
        animation.showConfetti();
        let restartButton = document.querySelector('#restart_btn');
        restartButton.addEventListener('click', function () {
            game.restart();
        });
    }
};
export default gameboard;
