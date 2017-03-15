var opponentPage = document.getElementById("opponent-page");
var computer = document.getElementById("opponent-computer");
var friend = document.getElementById("opponent-friend");

var selfPage = document.getElementById("self-page");
var selfO = document.getElementById("self-o");
var selfX = document.getElementById("self-x");
var self;

var boardSquares = document.getElementById("board-squares");
var squarelist = document.getElementsByClassName("square");
var statusText = document.getElementById("status");
var result = Array(9).fill(null);
var nextMove = true;



function opponentSet(boo) {
        for (let i = 0; i < 9; i++) {
            squarelist[i].onclick = function () {
                if (this.innerHTML == ""){
                    nextMove? this.innerHTML = "X":this.innerHTML = "O";
                    result[i] = this.innerHTML;
                    nextMove = !nextMove;
                    var nextMoveDisplay = document.getElementById("next-move");
                    nextMove? nextMoveDisplay.innerHTML ="X":nextMoveDisplay.innerHTML ="O";
                    var winner = calculateWinner(result);
                    if (winner !== null){
                        showResult(winner);
                        reset();
                     }
                    else if (!boo) {
                        setTimeout(randomMove,200);
                    }
                }
            }
        }
        if (boo) {
            statusText.innerHTML = `Player 1: <span id="score-1"></span>  Player 2: <span id="score-2"></span>`;
        }
        else {
            statusText.innerHTML = `Player: <span id="score-1"></span>  Computer: <span id="score-2"></span>`;
        }
        let score1 = document.getElementById("score-1");
        let score2 = document.getElementById("score-2");
        score1.innerHTML = 0;
        score2.innerHTML = 0;
}

function randomMove() {
    let i = Math.floor(Math.random()*9);
    if (!result[i]){
        nextMove? squarelist[i].innerHTML = "X":squarelist[i].innerHTML = "O";
        result[i] = squarelist[i].innerHTML;
        nextMove = !nextMove;
        let nextMoveDisplay = document.getElementById("next-move");
        nextMove? nextMoveDisplay.innerHTML ="X":nextMoveDisplay.innerHTML ="O";
        var winner = calculateWinner(result);
        if (winner !== null){
            showResult(winner);
            reset();
        }
    }
    else {
        randomMove();
    }

}

computer.onclick = function () {
    opponentPage.classList.add("invisible");
    selfPage.classList.remove("invisible");
    opponentSet(false);
}

friend.onclick = function () {
    opponentPage.classList.add("invisible");
    selfPage.classList.remove("invisible");
    opponentSet(true);
}

selfO.onclick = function () {
    selfPage.classList.add("invisible");
    boardSquares.classList.remove("invisible");
    nextMove = !nextMove;
    statusText.innerHTML += `<span id="next-status">Next</span>: <span id="next-move">${nextMove? "X":"O"}</span>`;
    self = nextMove? "X":"O";
}

selfX.onclick = function () {
    selfPage.classList.add("invisible");
    boardSquares.classList.remove("invisible");
    statusText.innerHTML += `<span id="next-status">Next</span>: <span id="next-move">${nextMove? "X":"O"}</span>`;
    self = nextMove? "X":"O";
}


function calculateWinner(result) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (result[a] && result[a] === result[b] && result[a] === result[c]) {

            return result[a];
        }
    }
    if (result.indexOf(null) == -1){
        return "Draw";
    }
    else {
        return null;
    }
}

function showResult(winner) {
    var nextMoveDisplay = document.getElementById("next-move");
    var nextStatus = document.getElementById("next-status");
    if (winner == "draw"){
        nextStatus.innerHTML = "This is a draw";
    }
    else {
        nextStatus.innerHTML = "Winner";
        nextMoveDisplay.innerHTML = winner;
        let score1 = document.getElementById("score-1");
        let score2 = document.getElementById("score-2");
        if (winner === self){
            score1.innerHTML = parseInt(score1.innerHTML) + 1;
        }
        else {
            score2.innerHTML = parseInt(score2.innerHTML) + 1;
        }
    }
}

function reset() {
    for (let i in squarelist) {
        squarelist[i].innerHTML = "";
    }
    result = Array(9).fill(null);
    var nextMoveDisplay = document.getElementById("next-move");
    var nextStatus = document.getElementById("next-status");
    nextMoveDisplay.innerHTML = nextMove? "X":"O";
    nextStatus.innerHTML = "Next";
}