import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
	@Input() index: number;
	image: string;
	bgColor: string = "transparent";
	
	updateBackground(){
		if (this.index == 1){
			if (this.global.playerOne){
				this.bgColor = "lightgreen";				
			} else {
				this.bgColor = "transparent";
			}
		} else {
			if (!this.global.playerOne){
				this.bgColor = "lightgreen";				
			} else {
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
		if (this.index == 1){
			this.image = "assets/x.png";
		} else {
			this.image = "assets/o.png";
		}
	}
	
	gameOver(winner: number){
		if (winner == this.index) {
			this.bgColor = "lightblue";
			if (this.index == 1){
				this.image = "assets/xWin.png";
			} else {
				this.image = "assets/oWin.png";
			}
		} else {
			this.bgColor = "transparent";
		}
	}
	
  constructor(private global: GlobalService) { }

  ngOnInit() {
		if (this.index == 1){
			this.image = "assets/x.png";
		} else {
			this.image = "assets/o.png";
		}

		if (this.index == 1){ // start with player 1
			this.bgColor = "lightgreen";
		}
  }

}
