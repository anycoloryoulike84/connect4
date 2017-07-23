// Connect Four Game

// Uses the minimax algorithm



// var playerMoves = [];
// var aiMoves = [];

var state = [];
// defined by Player, board and NextStates

//  Six High (y), Seven Across Grid (y)
var board = [
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null],
    [null, null, null, null, null, null]
]

var myMove = false;

// description of the current state of the game where the pieces are
var nextStates = [];
//  is a list of states can be reached by one move from Player
var benefit = [];
// how good a certain move is for the agent


// We can look at this system of States as a tree where each node is a Board that points to all of its NextStates. A partial example with tic-tac-toe is shown below

// Helper Functions
function getWinner(board) {

	// Check if someone won

	vals = [true,false];
	var allNotNull = true;

	for (var k = 0; k < vals.length; k++) {
		var value = vals[k];

		// Check Rows, colums, diagonals

		var diagonalComplete1 = true;
		var diagonalComplete2 = true;

		for (var i = 0; i < 4; i++) {

			if (board[i][i] != value ){
				diagonalComplete1 = false;
			}
			if (board[2-i][i] != value ){
				diagonalComplete2 = false;
			}

			var rowComplete = true;
			var colComplete = true;

		for (var j = 0; j < 4; j++) {	

			if (board[i][j] != value ){
				rowComplete = false;
			}
			if (board[j][i] != value ){
				colComplete = false;
			}
			if (board[i][j] != null ){
				allNotNull = false;
			}

		}

		if (rowComplete || colComplete) {
			return value ? 1 : 0;
		}

	}
		if (diagonalComplete1 || diagonalComplete2) {
				return value ? 1 : 0;
			}
	
	}

			
		if (allNotNull) {
			return -1;
		}
			return null;


	}



// Restart Game

function restartGame() {

	   board = [
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null],
	    [null, null, null, null, null, null]
	];

	myMove = false;

	updateMove();

}

// Update the moves

function updateMove() {

	upDateButtons();

	var winner = getWinner(board);

	$("#winner").append(winner == 1 ? "CPU Won" : winner == 0 ? "You Won!" : winner == -1 ? "Cats Game" : "");

	$("#move").append(myMove ? "CPU's move" : "Your Move");

}

function upDateButtons() {
	for (var i = 0; i < 4; i++) {

		for (var j = 0; j < 4; j++) {

			$("#a" + [i] + "" + j).append(board[i][j] == false ? "x" : board[i][j] == true ? "o" : "");

		}
	}
}



// Minimax algorithm

var numNodes = 0;

function recurseMiniMax(board,player) {

	numNodes++;

	var winner = getWinner(board);

	if (winner != null) {
		switch(winner) {
			case 1: 
			// CPU Wins
			return [1,board]

			case 0: 
			// Player wins
			return [-1,board]
			
			case -1: 
			// Tie
			return [0,board]
		}

	} else {

		var nextVal = null;
		var nextBoard = null;

		for (var i = 0; i < 4; i++) {

				for (var j = 0; j < 4; j++) { 

					if (board[i][j] == null) {
						board[i][j] = player;
						var value = recurseMiniMax(board, !player)[0];

						if ((player &&  (nextVal == null || value  > nextVal )) || (!player &&  (nextVal == null || value < nextVal)) ) {
							nextBoard = board.map(function(arr) {
								return arr.slice();
							
							});
							nextVal = value;
						}

						board[i][j] = null;
					}

				}
		}

		return [nextVal,nextBoard];

	}

}


function makeMove() {
	board = miniMaxMove(board);
	console.log(numNodes);
	myMove = false;
	updateMove();
	
}

function miniMaxMove(board) {
	numNodes = 0;
	return recurseMiniMax(board, true)[1];
}


// Event Handlers

if (myMove) {
	makeMove
}


$(document).ready(function(){

	$('button').click(function(){


		$(this).addClass("aiMove");
		var cell = $(this).attr("id").appendClass("aiMove");
		var row = parseInt(cell[1]);
		var col = parseInt(cell[2]);
		
		if (!myMove) {
			board[row][col] = false;
			myMove = true;
			updateMove();
			makeMove();

		}

	});

	$("#restart").click(restartGame)

});


updateMove();




















