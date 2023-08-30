import { Component, HostListener, OnDestroy, OnInit, Renderer2, Inject } from '@angular/core';
import { SignalrService } from '../services/signalr.service';
import { Subscription, timer } from 'rxjs';
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
  private lastShotTime = Date.now();
  private charecterSubscription?: Subscription;
  private connectionSubscription?: Subscription;
  private killedNameSubscription?: Subscription;
  private originalOverflow!: string;

  constructor(public signalrService: SignalrService, private renderer: Renderer2, 
    @Inject(DOCUMENT) private document: Document) { 

    this.currentUsername = JSON.parse(localStorage.getItem('currentUser')!).username;
  }

  ngOnInit() {
    this.originalOverflow = getComputedStyle(this.document.body).overflow;
    this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    this.signalrService.startConnection();
    this.signalrService.addTransferCharacterDataListener();
    this.charecterSubscription = this.signalrService.characterMoved$.subscribe((data: PlayerData[]) => {
      this.players = data;
    });

    this.connectionSubscription = this.signalrService.isConnectionStarted$.subscribe((isStarted: any) => {
      if (isStarted) {
          this.signalrService.startUpdatingStatus();
      }
    });
    this.killedNameSubscription = this.signalrService.killedCharacter$.subscribe((name: string) => {
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
        const now = Date.now();
        if (now - this.lastShotTime > 400) {
          this.makeAShoot();
          this.lastShotTime = now;
      }
    }

    if (!this.isKilled) {
      this.signalrService.movePlayer(this.currentUsername, this.playerPosition.x, this.playerPosition.y);
    }
  }

  hideRules() {
    this.showRules = false;
    this.addPlayer();
  }

  getImage(player: any): string {
    if (player.name.startsWith('bullet-')) {
      return 'assets/bullet-small.gif';
    } 
    else {
      return player.isReversed ? 'assets/soldier-reversed.gif' : 'assets/soldier.gif';
    }
  }

  addPlayer() {
    this.signalrService.addPlayer(this.currentUsername, this.playerPosition.x, this.playerPosition.y);
  }

  makeAShoot() {
    this.signalrService.makeAShot(this.lookRight, this.playerPosition.x, this.playerPosition.y, this.currentUsername);
  }

}
