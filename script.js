let whoseTurn;   
let startButton = document.getElementById('start_btn');

startButton.addEventListener('click', function(event){
    event.preventDefault();
    game.start();
})


let game = {

    winnerTag: "nobody",  //тут хранится кто победит - Х или 0

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

    process: function () {
        let isWin = this.isWining();

        if (isWin) {
            game.stop();
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
            let x = gameboard.gameboardArray[i][0];
            for (let j=0; j<3; j++){
                if (gameboard.gameboardArray[i][j] != x) break;
                if (j == 2) {
                    win = true;
                    game.winnerTag = gameboard.gameboardArray[i][j];
                    break;
                }
            }
        }
        //проверка для строк
        for (let j=0; j<3; j++){
            let x = gameboard.gameboardArray[0][j];
            for (let i=0; i<3; i++){
                if (gameboard.gameboardArray[i][j] != x) break;
                if (i == 2) {
                    win = true;
                    game.winnerTag = gameboard.gameboardArray[i][j];
                    break;
                }
            }
        }
        //проверка для диагоналей
        if ((gameboard.gameboardArray[0][2] == gameboard.gameboardArray[1][1]) && 
            (gameboard.gameboardArray[1][1] == gameboard.gameboardArray[2][0])){
                win = true;
                game.winnerTag = gameboard.gameboardArray[1][1];
            };
        if ((gameboard.gameboardArray[0][0] == gameboard.gameboardArray[1][1]) && 
            (gameboard.gameboardArray[0][0] == gameboard.gameboardArray[2][2])){
                win = true;
                game.winnerTag = gameboard.gameboardArray[1][1];
            };

        return (win);
    },

    stop: function(){
        gameboard.showWinner();
        gameboard.gameboardArray = [];  //очищает массив
    }
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

            if (name == "playerX_name") {
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
            this.gameboardArray.push(cellArray.slice(i * 3, (i + 1) * 3));
        }
        return cells;   //cells это нодлист
    },
  
    tagging: function (whoseTurn, cell) {
        cell.textContent = whoseTurn;
        //ищет индекс этой клетки в массиве gameboardArray
        let rowIndex = this.gameboardArray.findIndex(row => row.includes(cell));
        let columnIndex = this.gameboardArray[rowIndex].indexOf(cell); 
        //ищет индекс этой клетки в массиве gameboardArray
        this.gameboardArray[rowIndex][columnIndex] = whoseTurn;
        game.process(whoseTurn);
    },

    showWhoseTurn: function() {
        let whoseTurnName;
        if (players.player0.tag == whoseTurn) {
            whoseTurnName = players.player0.name;
        } else {
            whoseTurnName = players.playerX.name;
        }

        let turn = document.querySelector('.turn');
        turn.textContent = whoseTurnName + " player's turn!";
    },

    showWinner: function() {
        let winnerName;
        if (players.player0.tag == game.winnerTag) {
            winnerName = players.player0.name;
        } else {
            winnerName = players.playerX.name;
        }

        let congratsTable = document.querySelector('.congrats_table');
        congratsTable.style.cssText = 'display: block;';
        let congrats = document.querySelector('.congrats');
        congrats.textContent = "Congrats! " + winnerName + " win!"
    }

};




//мне нужно связать ДОМ-клетки gamefield и ячейки массива gameboardArray

//у меня будет глобальная переменная, которая будет показывать, чья сейчас очередь
//whoseTurn = "X"
//whoseTurn = "0"

//и на каждую ячейку повесить eventListener и функцию tagging - 
//которая запишет метку в массв и вернёт ячейку массива, и запустит gameboard.display(агрумент - ячейка массива)
//gameboard.display вставит в ДОМ-ячейку Х или 0, и вызовёт game.process
//game.process проверит isWining, поменяет глобальную turn, и выведет сообщение, чья сейчас очередь

//и дальше чел нажмёт на другую клетку, и всё повторится