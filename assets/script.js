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
        const currentPlayer = this.playerX.yourTurn ? this.playerX : this.playerO;
        let row = Number(prompt(`${currentPlayer.name}, choose a row`));
        let column = Number(prompt(`${currentPlayer.name}, choose a column`));



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

    checkingDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.gameBoard[i][j] === ' ') {
                    return false;
                }
            }
        }
        console.log("It's a draw!");
        this.retry();
        return true;
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
            this.playerX.points += 1;
            return true
        } else if (lines.some(line => line == "OOO") ||
            columns.some(line => line == "OOO") ||
            diagonals.some(line => line == "OOO")) {
            this.playerO.win = true;
            this.playerO.points += 1;
            return true
        }
    },

    retry() {
        let answer = prompt("Want to play again? s/n");
        let validAnswer = false;
        while (!validAnswer) {
            if (answer.toLowerCase() === "s" || answer.toLowerCase() === "n") {
                this.playerO.win = false;
                this.playerX.win = false;
                this.gameBoard = Array.from({ length: 3 }, () => Array(3).fill(" "));
                this.round = 0;
                validAnswer = true;
                if (answer.toLowerCase() == "s") {
                    this.game();
                }
            } else {
                console.log("Choose a valid answer!");
                answer = prompt("Want to play again? s/n");
            }
        }
    },

    game() {
        if (this.playerO.points == 0 && this.playerX.points == 0) {
            let playerXName = prompt("Choose a name for player X");
            let playerOname = prompt("Choose a name for player O");
            this.playerX.name = playerXName;
            this.playerO.name = playerOname;
        }
        let anyoneWin = false;

        while (!anyoneWin) {
            this.playTurn();
            let checkDraw = this.checkingDraw();
            let checkWin = this.checkingWinner();

            if (checkDraw) break;

            if (checkWin == true) {
                if (this.playerX.win == true) {
                    console.log(`${this.playerX.name} won!`);
                    anyoneWin = true;
                    this.retry()
                } else {
                    console.log(`${this.playerO.name} won!`);
                    anyoneWin = true;
                    this.retry()
                }
            }
        }
    }
}

const interface = {
    playerX: new Player("", "X", true, 0, false),
    playerO: new Player("", "O", false, 0, false),

    gameBoard: document.querySelectorAll(".square"),
    playerXPoints: document.querySelector("#x-points"),
    playerOPoints: document.querySelector("#o-points"),
    tiesPoints: document.querySelector("#ties-count"),
    turn: document.querySelector("#turn"),
    retryBtn: document.querySelector("#retry"),

    playTurn() {
        const currentPlayer = this.playerX.yourTurn ? this.playerX : this.playerO;
        this.turn.textContent = currentPlayer.marker;

        this.gameBoard.forEach((square) => {
            square.addEventListener(("click"), () => {
                square.textContent = currentPlayer.marker;
            })
        })

        
    },

    game() {
        this.playTurn();
    }
}
 


interface.game();