var film = ["TITANIC", "ROCKY", "MOONLIGHT", "GLADIATOR", "BRAVEHEART", "UNFORGIVEN", "CASABLANCA", "HAMLET"];
var totalGuesses = 10;
var userGuesses = [];
var computerPick;
var wordGuessed = [];
var guessesLeft = 0;
var finishedGame = false;
var wins = 0;
var losses = 0;


var keySound = new Audio("");


function startGame() {
    guessesLeft = totalGuesses;


    computerPick = Math.floor(Math.random() * (film.length));




    userGuesses = [];
    wordGuessed = [];


    for (var i = 0; i < film[computerPick].length; i++) {
        wordGuessed.push("_");
    }


    document.getElementById("pressKeyTryAgain").style.cssText = "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";


    refreshScreen();
};


function refreshScreen() {

    document.getElementById("gameWins").innerHTML = wins;
    document.getElementById("gameLosses").innerHTML = losses;

    var guessingWordText = "";
    for (var i = 0; i < wordGuessed.length; i++) {
        guessingWordText += wordGuessed[i];
    }


    document.getElementById("currentWord").innerHTML = guessingWordText;
    document.getElementById("guessesLeft").innerHTML = guessesLeft;
    document.getElementById("userGuesses").innerHTML = userGuesses;
};


function evaluateGuess(letter) {
    var positions = [];

    for (var i = 0; i < film[computerPick].length; i++) {
        if (film[computerPick][i] === letter) {
            positions.push(i);
        }
    }

    if (positions.length <= 0) {
        guessesLeft--;
    } else {
        for (var i = 0; i < positions.length; i++) {
            wordGuessed[positions[i]] = letter;
        }
    }
};


function checkWin() {
    if (wordGuessed.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        wins++;
        finishedGame = true;
    }
};


function checkLoss() {
    if (guessesLeft <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display: block";
        losses++;
        finishedGame = true;
    }
}


function makeGuess(letter) {
    if (guessesLeft > 0) {

        if (userGuesses.indexOf(letter) === -1) {
            userGuesses.push(letter);
            evaluateGuess(letter);
        }
    }
};


document.onkeydown = function (event) {

    if (finishedGame) {
        startGame();
        finishedGame = false;
    } else {

        if (event.keyCode >= 65 && event.keyCode <= 90) {
            keySound.play();
            makeGuess(event.key.toUpperCase());
            refreshScreen();
            checkWin();
            checkLoss();
        }
    }
};







