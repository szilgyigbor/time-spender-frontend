import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  
  private hubConnection: HubConnection;

  private characterMovedSource = new Subject<any>();
  characterMoved$ = this.characterMovedSource.asObservable();

  private isConnectionStarted = new BehaviorSubject<boolean>(false);
  isConnectionStarted$ = this.isConnectionStarted.asObservable();

  private isUpdating: boolean;

  //BASE_URL = 'https://spender-backend-7753b2e4b87a.herokuapp.com';
  BASE_URL = 'https://localhost:44320';

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.BASE_URL + '/gamehub')
    .configureLogging(signalR.LogLevel.Information)  // Enable logging
    .build();
    this.isUpdating = false;
  }


  public startConnection = () => {

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started');
        this.isConnectionStarted.next(true);
    })
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public stopConnection = () => {
    this.hubConnection
      .stop()
      .then(() => {
        console.log('Connection stopped')
        this.isConnectionStarted.next(false);
        this.characterMovedSource.next([]);
      })
      .catch(err => console.log('Error while stopping connection: ' + err))
  }

  public addTransferCharacterDataListener = () => {
    this.hubConnection.on('PlayersMoved', (data) => {
      console.log(data);
      this.characterMovedSource.next(data);
    });
  }

  public stopTransferCharacterDataListener = () => {
    this.hubConnection.off('PlayersMoved');
  }

  public movePlayer = (username: string, positionX: number, positionY: number) => {
    this.hubConnection
      .invoke('MoveCharacter', username, positionX, positionY)
      .catch(err => console.error(err));
  }

  public async startUpdatingStatus() {
    this.isUpdating = true;
    while (this.isUpdating) {
        try {
            await this.updateStatus();
        } catch (error) {
            console.error(error);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  public stopUpdatingStatus() {
    this.isUpdating = false;
  }

  public updateStatus = () => {
    this.hubConnection
      .invoke('UpdateStatus')
      .catch(err => console.error(err));
  } 
}