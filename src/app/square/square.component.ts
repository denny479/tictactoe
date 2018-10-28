import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {
	borderColor: string; // sets the borders black or white
	image: string = ""; // sets the background image of the square
	height: number; // adjusts the height for mobile responsive
	width: number; // adjusts the width for mobile responsive
	@Input() index: string; // the index of this square
	
  constructor(private global: GlobalService) { }

	@Output() squareClicked: EventEmitter<string> = new EventEmitter<string>();

	newGame(){
		this.image = ""; // remove background image before starting a new game
	}

	onClick(event){ // square was clicked
		if( this.global.inProgress == true && this.image == ""){ // if no game in progress don't do anything
			if(this.global.playerOne){ // place X or O on square depending on who's turn it is
				this.image = "url(assets/x.png)";
			} else {
				this.image = "url(assets/o.png)";
			}
			this.global.playerOne = !this.global.playerOne; // change to next player
			this.squareClicked.emit(this.index); // notify other components that this turn is over
		}
	}
	
	winningSquare(player: number){ // change background image to green X or O to show winning row
		if(player == 1){
			this.image = "url(assets/xWin.png)";
		} else {
			this.image = "url(assets/oWin.png)";
		}
	}

  ngOnInit() {
		this.onResize(0); // initialize to current screen size
		
		switch(this.index){ // set borders depending on where in the grid this square is
			case "0":
				this.borderColor="white black black white";
				break;
			case "1":
				this.borderColor="white black black black";
				break;
			case "2":
				this.borderColor="white white black black";
				break;
			case "3":
				this.borderColor="black black black white";
				break;
			case "4":
				this.borderColor="black";
				break;
			case "5":
				this.borderColor="black white black black";
				break;
			case "6":
				this.borderColor="black black white white";
				break;
			case "7":
				this.borderColor="black black white black";
				break;
			case "8":
				this.borderColor="black white white black";
				break;
			default:
				this.borderColor="white";
		}
  }		


	onResize(event) { // change width and height to fit on screen
		var width = ((window.innerWidth - 80)) ; // get window width - padding and possible scroll bar
		if (width>570) { width=570; } // don't go larger than the maximum
		width = (width / 3); // divide adjusted window width by 3
		this.width = width; // set width
		this.height = width; //set height
	}
}
