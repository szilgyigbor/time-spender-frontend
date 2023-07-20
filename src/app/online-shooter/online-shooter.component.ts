import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { PlayerData } from '../interfaces/player-data';


@Component({
  selector: 'tisp-online-shooter',
  templateUrl: './online-shooter.component.html',
  styleUrls: ['./online-shooter.component.css']
})
export class OnlineShooterComponent implements OnInit, OnDestroy {

  players: PlayerData[] = [];
  playerPosition = { x: 300, y: 300 };
  currentUsername : string = "";
  moveNumber = 3;
  private subscription?: Subscription;

  constructor(public signalrService: SignalrService, private router: Router) { 


    if (!!localStorage.getItem('currentUser') ==  false) {
      alert('You must be logged in to use this feature!');
      this.router.navigate(['/login']);}
    
    else {
      this.currentUsername = JSON.parse(localStorage.getItem('currentUser')!).username;
    }

  }

  ngOnInit() {
    
    
    this.signalrService.startConnection();
    this.signalrService.addTransferCharacterDataListener();
    this.subscription = this.signalrService.characterMoved$.subscribe(data => {
      console.log(data[0]);
      this.players = data;
    });
    
  }

  ngOnDestroy() {
    this.signalrService.stopConnection();
    this.signalrService.stopTransferCharacterDataListener();
    this.subscription?.unsubscribe();
  }


  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.playerPosition.y -= this.moveNumber;
        break;
      case 'ArrowDown':
        this.playerPosition.y += this.moveNumber;
        break;
      case 'ArrowLeft':
        this.playerPosition.x -= this.moveNumber;
        break;
      case 'ArrowRight':
        this.playerPosition.x += this.moveNumber;
        break;
    }

    this.signalrService.movePlayer(this.currentUsername, this.playerPosition.x, this.playerPosition.y);
  }





}
