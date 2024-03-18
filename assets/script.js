//const gameBoard = document.querySelectorAll(".square");



function Player(name, Marker) {
    this.name = name;
    this.marker = marker;
}

const game = {
    playerXPoint: 0,
    playerOPoints: 0,
    gameBoard: Array.from({ length: 3 }, () => Array(3).fill(" ")),

    winningCombinations: [
        //horizontal
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //vertical
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //diagonal
        [0, 4, 8],
        [2, 4, 6]
    ],

    printBoard() {
        for (row of this.gameBoard) {
            const rowString = row.join(" | ");
            console.log(rowString);
        };
    },

    updateGameBoard() {

    },

    playTurn() {
        let row = Number(prompt("Choose a row"));
        let column = Number(prompt("Choose a column"));

        this.gameBoard[row - 1][column - 1] = "X";

        this.printBoard();
    },

    checkingWinner() {

    },


};

game.playTurn()