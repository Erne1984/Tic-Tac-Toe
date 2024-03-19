//const gameBoard = document.querySelectorAll(".square");

function Player(name, Marker) {
    this.name = name;
    this.marker = marker;
}

const game = {
    playerXPoint: 0,
    playerOPoints: 0,
    gameBoard: Array.from({ length: 3 }, () => Array(3).fill(" ")),

    printBoard() {
        for (row of this.gameBoard) {
            const rowString = row.join(" | ");
            console.log(rowString);
        };
    },

    playTurn() {
        let row = Number(prompt("Choose a row"));
        let column = Number(prompt("Choose a column"));

        if (this.gameBoard[row - 1][column - 1] === 'X' || this.gameBoard[row - 1][column - 1] === 'O') {
            alert("Espaço já preenchido")
        } else {
            this.gameBoard[row - 1][column - 1] = "X";
        }

        this.printBoard();
    },

    checkingWinner() {
        let lines = [
            this.gameBoard[0].join(''),
            this.gameBoard[1].join(''),
            this.gameBoard[2].join('')
        ]
        let columns = [
            this.gameBoard.map(row => row[0]).join(''),
            this.gameBoard.map(row => row[1]).join(''),
            this.gameBoard.map(row => row[2]).join('')
        ]
        let diagonals = [
            this.gameBoard[0][0] + this.gameBoard[1][1] + this.gameBoard[2][2],
            this.gameBoard[0][2] + this.gameBoard[1][1] + this.gameBoard[2][0]
        ]

        if (lines.some(line => line == "XXX") ||
            columns.some(line => line == "XXX") ||
            diagonals.some(line => line == "XXX")) {
            console.log("X won!");
        } else if (lines.some(line => line == "OOO") ||
            columns.some(line => line == "OOO") ||
            diagonals.some(line => line == "OOO")) {
            console.log("O won!");
        }
    },

    roundPlayed(){
        
    }
};

game.playTurn()

game.checkingWinner()

game.playTurn()

game.checkingWinner()

game.playTurn()

game.checkingWinner()