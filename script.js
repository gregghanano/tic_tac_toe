$(document).ready(function(){
	
	var board = [false, false, false,
				 false, false, false,
				 false, false, false];

	var takenBy = ['','','',
					'','','',
					'','',''];
	var bestMove = 0;
	//setting the Game object
	function Game(){
	}

	Game.prototype.doMoves = function(space, user){
		if(user == true){
			match.draw(space, user);
			match.fillBoards(space - 1, user);
			match.compMoves(); //computer moves
		}
		if (user == false){
			match.draw(space, user);
			match.fillBoards(space - 1, user);
		}
		match.check();
	}
	Game.prototype.check = function(){
		//method to check who has won and restart game
		var won = match.checkWinner();
		if(won === "X"){
			$('.user-won').show("fast");
			$('.restart').show('fast');
		} else if (won === "O") {
			$('.computer-won').show("fast");
			$('.restart').show("fast");
		} else if (won === "draw"){
			$('.game-draw').show("fast");
			$('.restart').show('fast');
		}
	};

	Game.prototype.restart = function(){
		var board = [false, false, false,
					 false, false, false,
					 false, false, false];

		var takenBy = ['','','',
					'','','',
					'','',''];
		$('.x').hide();
		$('.o').hide();
		window.location.reload();
	}

	Game.prototype.draw = function(space, user){
		if(user == true){
			switch(space){
				case 1:
					$('.xo1.x').show("fast");
					break;
				case 2:
					$('.xo2.x').show("fast");
					break;
				case 3:
					$('.xo3.x').show("fast");
					break;
				case 4:
					$('.xo4.x').show("fast");
					break;
				case 5:
					$('.xo5.x').show("fast");
					break;
				case 6:
					$('.xo6.x').show("fast");
					break;
				case 7:
					$('.xo7.x').show("fast");
					break;
				case 8:
					$('.xo8.x').show("fast");
					break;
				case 9:
					$('.xo9.x').show("fast");
					break;
				default:
					$('.xo1.x').show('fast');
					break;
			}
		}
		if(user == false){
			switch(space){
				case 1:
					$('.xo1.o').show("fast");
					break;
				case 2:
					$('.xo2.o').show("fast");
					break;
				case 3:
					$('.xo3.o').show("fast");
					break;
				case 4:
					$('.xo4.o').show("fast");
					break;
				case 5:
					$('.xo5.o').show("fast");
					break;
				case 6:
					$('.xo6.o').show("fast");
					break;
				case 7:
					$('.xo7.o').show("fast");
					break;
				case 8:
					$('.xo8.o').show("fast");
					break;
				case 9:
					$('.xo9.o').show("fast");
					break;
				default:
					$('.xo1.o').show('fast');
					break;
			}
		}
	}
	// this method will fill the arrays so that the tic tac toe board will read
	// true for spaces with a character and can't be written over. The takenBy
	// array is so we can check who wins.
	Game.prototype.fillBoards = function(space, user){
		board[space] = true;
		if (user == true){
			takenBy[space] = "X";
		}

		if (user == false){
			takenBy[space] = "O";
		}
	}

	Game.prototype.possibleWin = function(winningChar, user){
		//method finds a possible winning move. returns 10 if
		//no move can win
		var possibleWin = '';
		var winningMove = 10;
		//cycle through all possible moves
		for(var i = 0; i < 9; i++){
			if(board[i] === false){
				var originalValue = takenBy[i];
				// for each possible move, check to see if that move will win
				match.fillBoards(i, user);
				possibleWin = match.checkWinner();
				if(possibleWin == winningChar){
					// console.log(i + " Possible win here!");
					winningMove = i;
					board[i] = false;
					takenBy[i] = originalValue;
					return i;
				}
				//remove the moves
				board[i] = false;
				takenBy[i] = originalValue;
			}
		}
		return 10;
	};

	Game.prototype.compMoves = function(){
		var temp = 10;

		//picks a random move if no best move
		for(var i=0; i< board.length; i++){
			if(board[i] === false)
				bestMove = i + 1;
		}
		//second move should be a corner
		if(board[6] == false && board[8] == false){
			bestMove = 7;
		}

		//take middle if open
		if (board[4] === false){
			bestMove = 5;
		}

		//quick fixes to block user wins when the computer cant on its own
		if (board[2] === true && board[4] === true && board[6] === true && board[7] === false) {
			bestMove = 8;
		}
		if(board[1] === true && board[5] === true && board[2] === false){
			bestMove = 3;
		}
		if(board[2] === true && board[4] === true && board[8] === false){
			bestMove = 9;
		}
		if(board[1] === true && board[8] === true && board[2] === false){
			bestMove = 3;
		}
		if(board[6] === true && board[2] === true && takenBy[4]==="O" && board[7] === false){
			bestMove = 8;
		}


		temp = match.possibleWin('X', true);
		if(temp !== 10){
			bestMove = temp + 1;
		}
		temp = match.possibleWin('O', false);
		if(temp !== 10){
			bestMove = temp + 1;
		}

		match.doMoves(bestMove, false);
	}

	//Check to see if X or O has won, 8 possible ways
	Game.prototype.checkWinner = function(){
		// ------- CHECK IF USER WINS ----------
		//check rows for X
		if (takenBy[0] == "X" && takenBy[1] == "X" && takenBy[2] == "X"){
			return "X";
		} else if (takenBy[3] == "X" && takenBy[4] == "X" && takenBy[5] == "X"){
			return "X";
		} else if (takenBy[6] == "X" && takenBy[7] == "X" && takenBy[8] == "X"){
			return "X"
		}

		//check columns for X
		if (takenBy[0] == "X" && takenBy[3] == "X" && takenBy[6] == "X"){
			return "X";
		} else if (takenBy[1] == "X" && takenBy[4] == "X" && takenBy[7] == "X"){
			return "X";
		} else if (takenBy[2] == "X" && takenBy[5] == "X" && takenBy[8] == "X"){
			return "X";
		}

		//check diagonals for X
		if (takenBy[0] == "X" && takenBy[4] == "X" && takenBy[8] == "X"){
			return "X";
		} else if (takenBy[2] == "X" && takenBy[4] == "X" && takenBy[6] == "X"){
			return "X";
		}

		// -------- CHECK IF COMPUTER WINS -----------
		//check rows for O
		if (takenBy[0] == "O" && takenBy[1] == "O" && takenBy[2] == "O"){
			return "O";
		} else if (takenBy[3] == "O" && takenBy[4] == "O" && takenBy[5] == "O"){
			return "O";
		} else if (takenBy[6] == "O" && takenBy[7] == "O" && takenBy[8] == "O"){
			return "O"
		}

		//check columns for O
		if (takenBy[0] == "O" && takenBy[3] == "O" && takenBy[6] == "O"){
			return "O";
		} else if (takenBy[1] == "O" && takenBy[4] == "O" && takenBy[7] == "O"){
			return "O";
		} else if (takenBy[2] == "O" && takenBy[5] == "O" && takenBy[8] == "O"){
			return "O";
		}

		//check diagonals for O
		if (takenBy[0] == "O" && takenBy[4] == "O" && takenBy[8] == "O"){
			return "O";
		} else if (takenBy[2] == "O" && takenBy[4] == "O" && takenBy[6] == "O"){
			return "O";
		}

		//------- CHECK IF DRAW --------
		var draw = true;
		for (var i = 0; i < board.length; i++){
			if (board[i] === false){
				draw = false;
			}
		}
		if (draw == true){
			return "draw";
		}

		return "neither";
	}

	var match = new Game();

	$('.x').hide();
	$('.o').hide();

	$(".top-left").click(function(){
		if(board[0] === false){
			match.doMoves(1, true);
		}
	})

	$(".top-middle").click(function(){
		if(board[1] === false){
			match.doMoves(2, true);
		}
	})

	$(".top-right").click(function(){
		if(board[2] === false){
			match.doMoves(3, true);
		}
	})

	$(".middle-left").click(function(){
		if(board[3] === false){
			match.doMoves(4, true);
		}
	})

	$(".middle").click(function(){
		if(board[4] === false){
			match.doMoves(5, true);
		}
	})

	$(".middle-right").click(function(){
		if(board[5] === false){
			match.doMoves(6, true);
		}
	})

	$(".bottom-left").click(function(){
		if(board[6] === false){
			match.doMoves(7, true);
		}
	})

	$(".bottom-middle").click(function(){
		if(board[7] === false){
			match.doMoves(8, true);
		}
	})

	$(".bottom-right").click(function(){
		if(board[8] === false){
			match.doMoves(9, true);
		}
	})
	$('.restart').click(function(){
		match.restart();
	})
})