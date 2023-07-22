let whoseTurn;   
let startButton = document.getElementById('start_btn');
let congratsTable = document.querySelector('.congrats_table');
let restartButton = document.querySelector('.restart_btn');

startButton.addEventListener('click', function(event){
    event.preventDefault();
    game.start();
});

restartButton.addEventListener('click', function(){
    game.restart();
});

let game = {
        winnerTag: "nobody",  //here the winner stored (X or 0)
        
        start: function () {
                players.getPersonName();
                let cells = gameboard.createArray();
                whoseTurn = "X";
    
                gameboard.showWhoseTurn(whoseTurn);
                cells.forEach(function(cell) {
                    cell.addEventListener('click', () => {
                        gameboard.tagging (whoseTurn, cell); 
                    })
                })
        },

        restart: function() {
            let cells = document.querySelectorAll('.cell');
            cells.forEach((cell) => {
                cell.textContent = "";
                cell.value = undefined;
            });
            congratsTable.style.cssText = "display: none; "
        },

        process: function () {
            let isWin = this.isWining();

            if (isWin) {
                gameboard.showWinner();
            } else {
                if (whoseTurn === "X") {
                    whoseTurn = "0";
                } else {
                    whoseTurn = "X";
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
            //проверка для строк
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



let players = {
        playerX: {
            tag: "X"    //тут ещё лежит name
        },
        player0: {
            tag: "0"
        },
        getPersonName: function(){
            let form = document.getElementById('enter_names_fields');
            const {elements} = form;
            Array.from(elements)
            .filter((item) => !!item.name)
            .map(function(element){
                const { name, value } = element
                if (name == "playerX_name") {   //добавляем имена в объекты игроков
                    players.playerX.name = value;
                } else {
                    players.player0.name = value;
                };
            });
        },
};



let gameboard = {
        gameboardArray: [],

        createArray: function() {
            let cells = document.querySelectorAll('.cell');
            let cellArray = Array.from(cells);
            for (let i = 0; i < 3; i++) {
                gameboard.gameboardArray.push(cellArray.slice(i * 3, (i + 1) * 3));
            }
            return cells;   //cells это нодлист
        },

        tagging: function (whoseTurn, cell) {
                //ищет индекс этой клетки в массиве gameboardArray
                let rowIndex = this.gameboardArray.findIndex(row => row.includes(cell));
                let columnIndex = this.gameboardArray[rowIndex].indexOf(cell); 
                //нашёл индекс этой клетки в массиве gameboardArray

            if (this.gameboardArray[rowIndex][columnIndex].value) {
                alert ("its already clicked!");
            } else {
                cell.textContent = whoseTurn;
                this.gameboardArray[rowIndex][columnIndex].value = whoseTurn;
                game.process(whoseTurn);
            };
        },

        showWhoseTurn: function() {
            let whoseTurnName;
            if (players.player0.tag == whoseTurn) {
                whoseTurnName = players.player0.name;
            } else {
                whoseTurnName = players.playerX.name;
            }
            let turn = document.querySelector('.turn');
            turn.textContent = whoseTurnName + " turn!";
        },

        showWinner: function() {
            let winnerName;
            if (players.player0.tag == game.winnerTag) {
                winnerName = players.player0.name;
            } else {
                winnerName = players.playerX.name;
            }
            congratsTable.style.cssText = 'display: block;';
            let congrats = document.querySelector('.congrats');
            congrats.textContent = "Congrats! " + winnerName + " win!"
        }

};