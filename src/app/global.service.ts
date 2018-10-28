import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
	private _inProgress: boolean = true; // is there a game currently in progress
	private _playerOne: boolean = true; // is it player 1's turn, if not it is player 2
	
	get inProgress(): boolean{
		return this._inProgress;
	}
	
	set inProgress(setInProgress: boolean){
		this._inProgress = setInProgress;
	}
	
	get playerOne(): boolean{
		return this._playerOne;
	}
	
	set playerOne(setPlayerOne: boolean){
		this._playerOne = setPlayerOne;
	}
	
  constructor() { }
}
