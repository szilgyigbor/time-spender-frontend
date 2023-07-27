import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';

import { PlayerData } from '../interfaces/player-data';


@Component({
  selector: 'tisp-online-shooter',
  templateUrl: './online-shooter.component.html',
  styleUrls: ['./online-shooter.component.css']
})
export class OnlineShooterComponent implements OnInit, OnDestroy {

  players: PlayerData[] = [];
  playerPosition = { 
    x: Math.floor(Math.random() * (1000 - 200 + 1)) + 200, 
    y: Math.floor(Math.random() * (600 - 200 + 1)) + 200 
  };
  currentUsername : string = "";
  moveNumber = 3;
  private charecterSubscription?: Subscription;
  private connectionSubscription?: Subscription;

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
    this.charecterSubscription = this.signalrService.characterMoved$.subscribe(data => {
      console.log(data[0]);
      this.players = data;
    });

    this.connectionSubscription = this.signalrService.isConnectionStarted$.subscribe(isStarted => {
      if (isStarted) {
          this.signalrService.startUpdatingStatus();
          this.signalrService.startBot();
      }
    });
        
  }

  ngOnDestroy() {
    Promise.all([
      this.signalrService.stopBot(),
      this.signalrService.stopUpdatingStatus(),
      this.signalrService.stopTransferCharacterDataListener()
    ]).then(() => {
      this.signalrService.stopConnection();
      this.charecterSubscription?.unsubscribe();
      this.connectionSubscription?.unsubscribe();
      this.players = [];
    }).catch(err => console.error(err));
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
