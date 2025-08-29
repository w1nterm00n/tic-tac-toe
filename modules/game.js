import animation from "./animation.js";
import gameboard from "./gameboard.js";
import players from "./players.js";
import { state } from "./state.js";

let game = {
    winnerTag: "nobody",  //здесь хранится победитель (X или 0)

    start: function () {
        animation.removeStartBtnAnimation();
        if (state.whoseTurn == undefined) {       //это означает "если "start" кликнут первый раз", потому что иначе whoseTurn будет "X" или "0"
            players.getPersonName();
            let cells = gameboard.createArray();
            state.whoseTurn = "X";
            gameboard.showWhoseTurn(state.whoseTurn);
            cells.forEach(function(cell) {
                cell.addEventListener('click', () => {
                    gameboard.tagging (state.whoseTurn, cell); 
                })
                cell.addEventListener("mouseenter", () => {
                    console.log("Навёл мышку");
                    cell.classList.add(state.whoseTurn === "X" ? "XcellHover" : "OcellHover");
                });
                cell.addEventListener("mouseleave", () => {
                    console.log("Убрал мышку");
                    cell.classList.remove(state.whoseTurn === "X" ? "XcellHover" : "OcellHover");
                });
                  
            })
        } else {
            game.restart(); 
        }
    },

    restart: function() {
        let cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => { //очищаем клетки
            cell.textContent = "";
            cell.value = undefined;
            cell.classList.remove("Xcell", "Ocell", "XcellHover", "OcellHover");
        });
        //скрываем congrats table
        let congratsTable = document.querySelector('.congrats_table');
        congratsTable.style.cssText = "display: none; "
    },

    processOfGame: function () {
        let isWin = this.isWining();
        if (isWin) {
            gameboard.showWinner();
        } else {
            if (state.whoseTurn === "X") {
                state.whoseTurn = "0";
            } else {
                state.whoseTurn = "X";
            };
            gameboard.showWhoseTurn();
        }
    },

    isWining: function() {
        let win = false;
        //проверка для строк
        for (let i=0; i<3; i++){
            let x = gameboard.gameboardArray[i][0].value;
            for (let j=0; j<3; j++){
                if (gameboard.gameboardArray[i][j].value != x) break;
                if ((j == 2) && x != undefined) {
                    win = true;
                    game.winnerTag = x;
                    break;
                }
            }
        }
        //проверка для столбцов
        for (let j=0; j<3; j++){
            let x = gameboard.gameboardArray[0][j].value;
            for (let i=0; i<3; i++){
                if (gameboard.gameboardArray[i][j].value != x) break;
                if ((i == 2) && x != undefined) {
                    win = true;
                    game.winnerTag = x;
                    break;
                }
            }
        }
        //проверка для диагоналей
        if ((gameboard.gameboardArray[0][2].value == gameboard.gameboardArray[1][1].value) && 
            (gameboard.gameboardArray[1][1].value == gameboard.gameboardArray[2][0].value)&& 
            (gameboard.gameboardArray[1][1].value) != undefined){
                win = true;
                game.winnerTag = gameboard.gameboardArray[1][1].value;
            };
        if ((gameboard.gameboardArray[0][0].value == gameboard.gameboardArray[1][1].value) && 
            (gameboard.gameboardArray[0][0].value == gameboard.gameboardArray[2][2].value) && 
            (gameboard.gameboardArray[1][1].value) != undefined){
                win = true;
                game.winnerTag = gameboard.gameboardArray[1][1].value;
            };
        return (win);
    },
};


export default game;