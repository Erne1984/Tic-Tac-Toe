//const gameBoard = document.querySelectorAll(".square");

function Player(name, marker, yourTurn, points, win) {
    this.name = name;
    this.marker = marker;
    this.yourTurn = yourTurn;
    this.points = points;
    this.win = win
}

const ticTacToe = {
    playerX: new Player("", "X", false, 0, false),
    playerO: new Player("", "O", false, 0, false),
    round: 0,
    gameBoard: Array.from({ length: 3 }, () => Array(3).fill(" ")),

    printBoard() {
        for (row of this.gameBoard) {
            const rowString = row.join(" | ");
            console.log(rowString);
        };
    },

    playTurn() {
        let row = Number(prompt(`${currentPlayer.name}, choose a row`));
        let column = Number(prompt(`${currentPlayer.name}, choose a column`));
        const currentPlayer = this.playerX.yourTurn ? this.playerX : this.playerO;
;

        if (this.gameBoard[row - 1][column - 1] === 'X' || this.gameBoard[row - 1][column - 1] === 'O') {
            alert("Espaço já preenchido");
            return;
        }

        this.gameBoard[row - 1][column - 1] = currentPlayer.marker;

        console.log(`Round ${this.round + 1}: ${currentPlayer.name} (${currentPlayer.marker})`);
        this.round += 1;

        this.playerX.yourTurn = !this.playerX.yourTurn;
        this.playerO.yourTurn = !this.playerO.yourTurn;

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
            this.playerX.win = true;
            return true
        } else if (lines.some(line => line == "OOO") ||
            columns.some(line => line == "OOO") ||
            diagonals.some(line => line == "OOO")) {
            this.playerO.win = true;
            return true
        }
    },
    game() {
        let playerXName = prompt("Choose a name for player X");
        let playerOname = prompt("Choose a name for player O");
        this.playerX.name = playerXName;
        this.playerO.name = playerOname;
        let anyoneWin = false;

        while(!anyoneWin){
            this.playTurn();
            let check = this.checkingWinner();

            if(check == true){
                if(this.playerX.win == true){
                    console.log(`${this.playerX.name} won!`);
                    anyoneWin = true;
                }else{
                    console.log(`${this.playerO.name} won!`);
                    anyoneWin = true;
                }
            }
        }
    }
};

ticTacToe.game()