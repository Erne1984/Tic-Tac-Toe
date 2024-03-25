function Player(name, marker, yourTurn, points, win) {
    this.name = name;
    this.marker = marker;
    this.yourTurn = yourTurn;
    this.points = points;
    this.win = win
}

// Jogo no console
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

// Jogo na UI
const interface = {
    playerX: new Player("", "X", true, 0, false),
    playerO: new Player("", "O", false, 0, false),
    ties: 0,

    gameBoard: document.querySelectorAll(".square"),
    playerXPoints: document.querySelector("#x-points"),
    playerOPoints: document.querySelector("#o-points"),
    tiesPoints: document.querySelector("#ties-count"),
    turnX: document.querySelector("#turn-x"),
    turnO: document.querySelector("#turn-o"),
    retryBtn: document.querySelector("#retry"),

    playTurn() {
        this.gameBoard.forEach((square) => {
            square.addEventListener(("click"), () => {

                const currentPlayer = this.playerX.yourTurn ? this.playerX : this.playerO;

                if (square.textContent == "") {
                    this.manageTurn(currentPlayer);
                    if (currentPlayer.marker == "X") {
                        square.classList.toggle('x-icon-board');
                        square.textContent = currentPlayer.marker;
                    } else {
                        square.classList.toggle('o-icon-board');
                        square.textContent = currentPlayer.marker;
                    }

                }
                if (this.checkingWinner()) {
                    this.resetBoard();
                }
                this.draw();

                this.playerX.yourTurn = !this.playerX.yourTurn;
                this.playerO.yourTurn = !this.playerO.yourTurn;
            })
        })


    },

    manageTurn(currentPlayer) {
        if (currentPlayer.marker === "X") {
            this.turnX.classList.toggle("none");
            this.turnO.classList.toggle("none");
        } else if (currentPlayer.marker === "O") {
            this.turnX.classList.toggle("none");
            this.turnO.classList.toggle("none");
        }
    },

    checkingWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
            [0, 4, 8], [2, 4, 6] // Diagonais
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            const squares = this.gameBoard;

            if (
                squares[a].textContent &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            ) {
                if (squares[a].textContent === 'X') {
                    this.playerX.points++;
                    this.playerXPoints.textContent = this.playerX.points;
                } else {
                    this.playerO.points++;
                    this.playerOPoints.textContent = this.playerO.points;
                }
                return true;
            }
        }

        return false;
    },

    resetBoard() {
        const squares = this.gameBoard;

        for (square of squares) {
            square.textContent = "";

            square.classList.remove("none");
            square.classList.remove('x-icon-board');
            square.classList.remove('o-icon-board');
        }

    },

    resetGame() {
        this.retryBtn.addEventListener("click", () => {
            this.resetBoard();
            this.ties = 0;
            this.playerX.points = 0;
            this.playerO.points = 0;

            this.playerXPoints.textContent = this.playerX.points;
            this.playerOPoints.textContent = this.playerO.points;
            this.tiesPoints.textContent = this.ties;
        })
    },

    draw() {
        const squares = this.gameBoard;
        let isBoardFull = true;
        for (const square of squares) {
            if (square.textContent === "") {
                isBoardFull = false;
                break;
            }
        }

        if (isBoardFull && !this.checkingWinner()) {
            this.resetBoard();
            this.ties++;
            this.tiesPoints.textContent = this.ties;
        }
    },

    game() {
        this.playTurn();
        this.resetGame();
    }
}



interface.game();