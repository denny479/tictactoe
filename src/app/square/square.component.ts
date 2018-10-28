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
		this.image = "";
	}

	onClick(event){
		if( this.global.inProgress == true && this.image == ""){
			if(this.global.playerOne){
				this.image = "url(assets/x.png)";
			} else {
				this.image = "url(assets/o.png)";
			}
			this.global.playerOne = !this.global.playerOne;
			this.squareClicked.emit(this.index);
		}
	}
	
	winningSquare(player: number){
		if(player == 1){
			this.image = "url(assets/xWin.png)";
		} else {
			this.image = "url(assets/oWin.png)";
		}
	}

  ngOnInit() {
		this.onResize(0);
		
		switch(this.index){
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


	onResize(event) {
		var width = ((window.innerWidth - 80)) ;
		if (width>570) { width=570; }
		width = (width / 3);
		this.width = width;
		this.height = width;
	}
}
