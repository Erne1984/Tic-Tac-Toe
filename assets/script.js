//const gameBoard = document.querySelectorAll(".square");

const winningCombinations = [
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
]

function Player(name, Marker) {
    this.name = name;
    this.marker = marker;
}

const game = {
    playerXPoint: 0,
    playerOPoints: 0,
    gameBoard: Array.from({ length: 3 }, () => Array(3).fill(" ")), 
    printBoard() {
        for (let i = 0; i < this.gameBoard.length; i++) {
            let row = "";
            for (let j = 0; j < this.gameBoard[i].length; j++) {
                if (j === this.gameBoard[i].length - 1) {
                    row += this.gameBoard[i][j];
                } else {
                    row += this.gameBoard[i][j] + " | ";
                }
            }
            console.log(row);
        }
    },
    updateGameBoard() {

    },
    playTurn() {
        this.printBoard();
        let row = Number(prompt("Choose a row"));
        let column = Number(prompt("Choose a column"));

        this.gameBoard[row - 1][column - 1] = "X";

        this.printBoard();
    }
};

game.playTurn()