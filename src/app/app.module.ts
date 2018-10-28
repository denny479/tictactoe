import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { SquareComponent } from './square/square.component';
import { StartComponent } from './start/start.component';
import { PlayerComponent } from './player/player.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    StartComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
