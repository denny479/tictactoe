import { Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { SquareComponent } from '../square/square.component'
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

// div holding grid of nine cells, game board
export class BoardComponent implements OnInit {
	width: number; // style.width of the component for mobile responsive
	height: number; // style.height of the component for mobile responsive

	@Output() squareClicked: EventEmitter<string> = new EventEmitter<string>(); // cell clicked event
	@Output() gameOver: EventEmitter<number> = new EventEmitter<number>(); // cell clicked event
	@ViewChildren(SquareComponent) squares: QueryList<SquareComponent>; // cells

	check = []; // array of winning combinations to test
	winner: number = 0; // none = 0, player1 = 1, player2 = 2, draw = 3
	row: number = -1; // if someone wins this is the check[] index of the winning cells
	empty: number = 0; // counts empty squares to check for draw (0 = draw)

	newGame(){
		var sq: SquareComponent[] = this.squares.toArray(); // get array of grid cells
		for (let i = 0; i < sq.length; i++){ // get content of each cell
			sq[i].newGame();
		}		
		this.winner = 0;
		this.row = -1;
	}

	squareClick(event){ // emitted by square when player clicks
		if (this.checkForWinner()){ // check for game over
			this.colorSquares();
			this.gameOver.emit(this.winner);
		} else {
			this.squareClicked.emit(event); // forward event to other components
		}
	}
	
	colorSquares(){
		if (this.row >= 0){
			var sq: SquareComponent[] = this.squares.toArray(); // get array of grid cells
			for (let i = 0; i < sq.length; i++){ // get content of each cell
				if (sq[i].index == this.check[this.row][0] 
						|| sq[i].index == this.check[this.row][1] 
						|| sq[i].index == this.check[this.row][2]){
					sq[i].winningSquare(this.winner);
				}
			}
		}		
	}
	
	checkForWinner(){
		this.empty = 0;
		var sq: SquareComponent[] = this.squares.toArray(); // get array of grid cells
		var list = []; // array of X's and O's or empty
		for (let i = 0; i < sq.length; i++){ // get content of each cell
			let x = Number(sq[i].index);
			if (sq[i].image.includes("x.png")){
				list[x] = 1; // playerOne is true
			} else if (sq[i].image.includes("o.png")){
				list[x] = 0; // playerOne is false
			} else {
				list[x] = 9; // cell is empty
				++this.empty; // to test for if no empty cells game over / draw
			}
		}

		for (let i = 0; i < 8; i++){ // check each row and column for a winner
			// sum each cell in each of the check array's sub-arrays
			let x = list[this.check[i][0]] + list[this.check[i][1]] + list[this.check[i][2]];
			if (x == 3){ // if all three are ones
				this.winner = 1; // set the winner 1
				this.row = i; // save the winning row to decorate
			} else if (x == 0) { // if all three are zeros
				this.winner = 2; // set the winner 2
				this.row = i; // save the winning row to decorate
			}
		}
		if (this.winner == 0 && this.empty == 0){ // game is a draw
			this.winner = 3;
		}
		if (this.winner > 0){ // somebody won
      return true;
		}
    return false; // nobody won
	}

	constructor(private global: GlobalService) { }

  ngOnInit() {
		this.onResize(0); // initialize to screen size

		// initialize array of rows to test for winner
		this.check[0] = [0, 1, 2];
		this.check[1] = [3, 4, 5];
		this.check[2] = [6, 7, 8];
		this.check[3] = [0, 3, 6];
		this.check[4] = [1, 4, 7];
		this.check[5] = [2, 5, 8];
		this.check[6] = [0, 4, 8];
		this.check[7] = [2, 4, 6];
  }

	onResize(event) { // mobile responsive
		var width = (window.innerWidth - 80); // window width minus padding and scrollbar
		if (width>570) { width=570; } // max width 570
		this.width = width; // set width
		this.height = width; // set height
	}
}
