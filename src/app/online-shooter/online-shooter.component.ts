import { Component, HostListener, OnDestroy, OnInit, Renderer2, Inject } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
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
  showRules: boolean = true;
  currentUsername : string = "";
  moveNumber = 2;
  lookRight: boolean = true;
  isKilled: boolean = false;
  private charecterSubscription?: Subscription;
  private connectionSubscription?: Subscription;
  private killedNameSubscription?: Subscription;
  private originalOverflow!: string;

  constructor(public signalrService: SignalrService, private router: Router,
    private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) { 

    if (!!localStorage.getItem('currentUser') ==  false) {
      alert('You must be logged in to use this feature!');
      this.router.navigate(['/login']);}
    
    else {
      this.currentUsername = JSON.parse(localStorage.getItem('currentUser')!).username;
    }

  }

  ngOnInit() {
    this.originalOverflow = getComputedStyle(this.document.body).overflow;
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    this.signalrService.startConnection();
    this.signalrService.addTransferCharacterDataListener();
    this.charecterSubscription = this.signalrService.characterMoved$.subscribe(data => {
      this.players = data;
    });

    this.connectionSubscription = this.signalrService.isConnectionStarted$.subscribe(isStarted => {
      if (isStarted) {
          this.signalrService.startUpdatingStatus();
      }
    });
    this.killedNameSubscription = this.signalrService.killedCharacter$.subscribe(name => {
      if (name == this.currentUsername) {
        alert('You were killed!');
        this.isKilled = true;
       
      }
    });
        
  }

  ngOnDestroy() {
    this.renderer.setStyle(this.document.body, 'overflow', this.originalOverflow);
    Promise.all([
      this.signalrService.killPlayer(this.currentUsername),
      this.signalrService.stopUpdatingStatus(),
      this.signalrService.stopTransferCharacterDataListener(),
    ]).then(() => {
      this.charecterSubscription?.unsubscribe();
      this.connectionSubscription?.unsubscribe();
      this.killedNameSubscription?.unsubscribe();
      this.players = [];
      this.signalrService.stopConnection();
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
        this.lookRight = false;
        this.playerPosition.x -= this.moveNumber;
        break;
      case 'ArrowRight':
        this.lookRight = true;
        this.playerPosition.x += this.moveNumber;
        break;
      case ' ':
        this.makeAShoot();
        break;
    }

    if (!this.isKilled) {
      this.signalrService.movePlayer(this.currentUsername, this.playerPosition.x, this.playerPosition.y);
    }
  }

  hideRules() {
    this.showRules = false;
  }

  getImage(player: any): string {
  if (player.name.startsWith('bullet-')) {
    return 'assets/bullet-small.gif';
  } 
  else {
    return player.isReversed ? 'assets/soldier-reversed.gif' : 'assets/soldier.gif';
  }
}

  makeAShoot() {
    this.signalrService.makeAShot(this.lookRight, this.playerPosition.x, this.playerPosition.y, this.currentUsername);
  }

}
