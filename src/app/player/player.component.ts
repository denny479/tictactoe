import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	@Input() index: number; // index of player, player 1 or player 2
	image: string; // img is either X or O
	bgColor: string = "transparent"; // div's background color
	
	updateBackground(){ // chnage background color if it is this player's turn
		if (this.index == 1){ // if player 1
			if (this.global.playerOne){ // if player 1's turn set green bg 
				this.bgColor = "lightgreen";				
			} else { // otherwise set bg transparent
				this.bgColor = "transparent";
			}
		} else { // player 2
			if (!this.global.playerOne){ // if player 2
				this.bgColor = "lightgreen"; // if player 2's turn set green bg 	
			} else { // otherwise set bg transparen
				this.bgColor = "transparent";
			}			
		}
	}
	
	newGame(){
		if (this.index == 1){ // start with player 1
			this.bgColor = "lightgreen";
		} else {
			this.bgColor = "transparent";
		}
		if (this.index == 1){ // set img back to normal X or O
			this.image = "assets/x.png";
		} else {
			this.image = "assets/o.png";
		}
	}
	
	gameOver(winner: number){ // change img and background to display winner
		if (winner == this.index) { // if winner number matches this index
			this.bgColor = "lightblue"; // change bg color
			if (this.index == 1){ // change to green X or O
				this.image = "assets/xWin.png";
			} else {
				this.image = "assets/oWin.png";
			}
		} else { //otherwise clear the background (needed to clear in case of a draw)
			this.bgColor = "transparent";
		}
	}
	
  constructor(private global: GlobalService) { }

  ngOnInit() {
		if (this.index == 1){ // set image to X or O
			this.image = "assets/x.png";
		} else {
			this.image = "assets/o.png";
		}

		if (this.index == 1){ // start with player 1
			this.bgColor = "lightgreen";
		}
  }

}
