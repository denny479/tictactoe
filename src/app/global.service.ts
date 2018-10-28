import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
	private _inProgress: boolean = true;
	private _playerOne: boolean = true;
	public test: string = "";
	
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
