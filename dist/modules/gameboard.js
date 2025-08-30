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
            gameboard.gameboardArray.push(cellArray.slice(i * 3, (i + 1) * 3));
        }
        return cells; //cells это нодлист
    },
    tagging: function (whoseTurn, cell) {
        //ищет индекс этой клетки в массиве gameboardArray
        let rowIndex = this.gameboardArray.findIndex(row => row.includes(cell));
        let columnIndex = this.gameboardArray[rowIndex].indexOf(cell);
        //нашёл индекс этой клетки в массиве gameboardArray
        if (this.gameboardArray[rowIndex][columnIndex].value) {
            alert("its already clicked!");
        }
        else {
            cell.classList.add(whoseTurn === "X" ? "Xcell" : "Ocell");
            this.gameboardArray[rowIndex][columnIndex].value = whoseTurn;
            game.processOfGame(whoseTurn);
        }
        ;
    },
    showWhoseTurn: function () {
        let whoseTurnName;
        if (players.player0.tag == state.whoseTurn) {
            whoseTurnName = players.player0.name;
        }
        else {
            whoseTurnName = players.playerX.name;
        }
        let turn = document.querySelector('.turn');
        turn.style.opacity = 0;
        setTimeout(() => {
            turn.textContent = whoseTurnName + " turn!";
            turn.style.opacity = 1;
        }, 300);
    },
    showWinner: function () {
        let winnerName;
        if (players.player0.tag == game.winnerTag) {
            winnerName = players.player0.name;
        }
        else {
            winnerName = players.playerX.name;
        }
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
