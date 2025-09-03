import animation from "./animation.js";
import gameboard from "./gameboard.js";
import players from "./players.js";
import { state, Tag } from "./state.js";

interface Game {
    winnerTag: Tag | undefined;
    start: (this: Game) => void;
    restart: () => void;
    processOfGame: (this: Game) => void;
    isWining: (this: Game) => boolean;
}


let game: Game = {

    winnerTag: undefined,

    start: function (this: Game): void {
        animation.removeStartBtnAnimation();
        if (state.whoseTurn === null) {  //this means "if "start" clicked first time", because otherwise whoseTurn will be "X" or "0"
            players.getPersonName();
            let cells = gameboard.createArray();
            state.whoseTurn = "X";
            gameboard.showWhoseTurn();
            cells.forEach(function(cell: HTMLElement) {
                cell.addEventListener('click', (e: MouseEvent) => {
                    if (state.whoseTurn) {
                        gameboard.tagging (state.whoseTurn, cell); 
                    } else {
                        console.log("whoseTurn is null")
                        return;
                    }
                })
                cell.addEventListener("mouseenter", (e: MouseEvent) => {
                    cell.classList.add(state.whoseTurn === "X" ? "XcellHover" : "OcellHover");
                });
                cell.addEventListener("mouseleave", (e: MouseEvent) => {
                    cell.classList.remove("XcellHover", "OcellHover");
                });
                  
            })
        } else {
            this.restart(); 
        }
    },

    restart: function(): void {
        let cells: NodeListOf<HTMLElement> = document.querySelectorAll('.cell');
        cells.forEach((cell) => { //cleaning the cells
            cell.textContent = "";
            cell.removeAttribute("data-value");
            cell.classList.remove("Xcell", "Ocell", "XcellHover", "OcellHover");
        });
        //hide congrats table
        let congratsTable = document.querySelector('.congrats_table') as HTMLElement;
        congratsTable.style.cssText = "display: none; "
    },

    processOfGame: function (this: Game): void {
        let isWin: boolean = this.isWining();
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

    isWining: function (this: Game): boolean {
        let win = false;
        //checking rows
        for (let i=0; i<3; i++){
            let x: Tag = gameboard.gameboardArray[i][0].dataset.value as Tag;
            for (let j=0; j<3; j++){
                if (gameboard.gameboardArray[i][j].dataset.value !== x) break;
                if ((j === 2) && x !== undefined) {
                    win = true;
                    this.winnerTag = x;
                    break;
                }
            }
        }
        //checking cols
        for (let j=0; j<3; j++){
            let x: Tag = gameboard.gameboardArray[0][j].dataset.value as Tag;
            for (let i=0; i<3; i++){
                if (gameboard.gameboardArray[i][j].dataset.value !== x) break;
                if ((i === 2) && x !== undefined) {
                    win = true;
                    this.winnerTag = x;
                    break;
                }
            }
        }
        //checking diagonals
        if ((gameboard.gameboardArray[0][2].dataset.value === gameboard.gameboardArray[1][1].dataset.value) && 
            (gameboard.gameboardArray[1][1].dataset.value === gameboard.gameboardArray[2][0].dataset.value)&& 
            (gameboard.gameboardArray[1][1].dataset.value) !== undefined){
                win = true;
                this.winnerTag = gameboard.gameboardArray[1][1].dataset.value as Tag;
            };
        if ((gameboard.gameboardArray[0][0].dataset.value === gameboard.gameboardArray[1][1].dataset.value) && 
            (gameboard.gameboardArray[0][0].dataset.value === gameboard.gameboardArray[2][2].dataset.value) && 
            (gameboard.gameboardArray[1][1].dataset.value) !== undefined){
                win = true;
                this.winnerTag = gameboard.gameboardArray[1][1].dataset.value as Tag;
            };
        return (win);
    },
};


export default game;