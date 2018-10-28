import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
	text: string = "Player 1's turn"; // text for player's turn
	buttonOn: string = "hidden"; // toggle between new game button and player's turn text
	turnOn: string = "visible"; // toggle between new game button and player's turn text
	winner: string; // show which player is the winner on start new game button
	@Output() newGame: EventEmitter<any> = new EventEmitter<any>(); // notify other components to reset for new game
	
	nextPlayer(){ // change the display showing which players turn
		if (this.global.playerOne){
			this.text = "Player 1's turn";
		} else {
			this.text = "Player 2's turn";
		}
	}
	
	gameOver(winner: number){ // display the winner or draw on new game button
		this.global.inProgress = false; // stop game so players can't click cells
		if (winner < 3){ // if less than 3 someone won
			this.winner = "Winner is Player " + winner;
		} else { // game was a draw
			this.winner = "The game was a draw";
		}
		this.buttonOn = "visible";
		this.turnOn = "hidden";
	}

  constructor(private global: GlobalService) { }

  ngOnInit() {
  }
	
	onClick(event){ // new game button was clicked
		this.global.playerOne = true; // set player 1 to go first
		this.global.inProgress = true; // start game
		this.text = "Player 1's turn"; // display player's turn
		this.buttonOn = "hidden"; // toggle new game button / player's turn display
		this.turnOn = "visible"; // toggle new game button / player's turn display
		this.newGame.emit(); // notify other components to reset
	}

}
