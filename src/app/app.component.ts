import { Component, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { GlobalService } from './global.service';
import { StartComponent } from './start/start.component'
import { PlayerComponent } from './player/player.component'
import { BoardComponent } from './board/board.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(StartComponent) start: StartComponent; // Start new game / Player's turn
	@ViewChildren(PlayerComponent) playerComponents: QueryList<PlayerComponent>; // players
	@ViewChild(BoardComponent) board: BoardComponent;
	
	title = 'TicTacToe';
	
	squareClick(event){
		this.start.nextPlayer();
		var players: PlayerComponent[] = this.playerComponents.toArray();
		for (let i = 0; i < 2; i++){
			players[i].updateBackground();
		}
	}
	
	newGame(){
		this.board.newGame();
		var players: PlayerComponent[] = this.playerComponents.toArray();
		for (let i = 0; i < 2; i++){
			players[i].newGame();
		}		
	}
	
	gameOver(winner: number){
		this.start.gameOver(winner);
		var players: PlayerComponent[] = this.playerComponents.toArray();
		for (let i = 0; i < 2; i++){
			players[i].gameOver(winner);
		}		
	}
		
	constructor(public global: GlobalService){
		
	}
	
	ngAfterViewInit() {
 

  }
}
