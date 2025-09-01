import animation from "./animation.js";
import gameboard from "./gameboard.js";
import players from "./players.js";
import { state } from "./state.js";
let game = {
    winnerTag: undefined,
    start: function () {
        animation.removeStartBtnAnimation();
        if (state.whoseTurn === null) { //this means "if "start" clicked first time", because otherwise whoseTurn will be "X" or "0"
            players.getPersonName();
            let cells = gameboard.createArray();
            state.whoseTurn = "X";
            gameboard.showWhoseTurn();
            cells.forEach(function (cell) {
                cell.addEventListener('click', (e) => {
                    if (state.whoseTurn) {
                        gameboard.tagging(state.whoseTurn, cell);
                    }
                    else {
                        console.log("whoseTurn is null");
                        return;
                    }
                });
                cell.addEventListener("mouseenter", (e) => {
                    cell.classList.add(state.whoseTurn === "X" ? "XcellHover" : "OcellHover");
                });
                cell.addEventListener("mouseleave", (e) => {
                    cell.classList.remove("XcellHover", "OcellHover");
                });
            });
        }
        else {
            this.restart();
        }
    },
    restart: function () {
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.dataset.value = "";
            cell.classList.remove("Xcell", "Ocell", "XcellHover", "OcellHover");
        });
        //hide congrats table
        let congratsTable = document.querySelector('.congrats_table');
        congratsTable.style.cssText = "display: none; ";
    },
    processOfGame: function () {
        let isWin = this.isWining();
        if (isWin) {
            gameboard.showWinner();
        }
        else {
            if (state.whoseTurn === "X") {
                state.whoseTurn = "0";
            }
            else {
                state.whoseTurn = "X";
            }
            ;
            gameboard.showWhoseTurn();
        }
    },
    isWining: function () {
        let win = false;
        //checking rows
        for (let i = 0; i < 3; i++) {
            let x = gameboard.gameboardArray[i][0].dataset.value;
            for (let j = 0; j < 3; j++) {
                if (gameboard.gameboardArray[i][j].dataset.value !== x)
                    break;
                if ((j === 2) && x !== undefined) {
                    win = true;
                    this.winnerTag = x;
                    break;
                }
            }
        }
        //checking cols
        for (let j = 0; j < 3; j++) {
            let x = gameboard.gameboardArray[0][j].dataset.value;
            for (let i = 0; i < 3; i++) {
                if (gameboard.gameboardArray[i][j].dataset.value !== x)
                    break;
                if ((i === 2) && x !== undefined) {
                    win = true;
                    this.winnerTag = x;
                    break;
                }
            }
        }
        //checking diagonals
        if ((gameboard.gameboardArray[0][2].dataset.value === gameboard.gameboardArray[1][1].dataset.value) &&
            (gameboard.gameboardArray[1][1].dataset.value === gameboard.gameboardArray[2][0].dataset.value) &&
            (gameboard.gameboardArray[1][1].dataset.value) !== undefined) {
            win = true;
            this.winnerTag = gameboard.gameboardArray[1][1].dataset.value;
        }
        ;
        if ((gameboard.gameboardArray[0][0].dataset.value === gameboard.gameboardArray[1][1].dataset.value) &&
            (gameboard.gameboardArray[0][0].dataset.value === gameboard.gameboardArray[2][2].dataset.value) &&
            (gameboard.gameboardArray[1][1].dataset.value) !== undefined) {
            win = true;
            this.winnerTag = gameboard.gameboardArray[1][1].dataset.value;
        }
        ;
        return (win);
    },
};
export default game;
