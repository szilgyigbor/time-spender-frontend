import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  
  private hubConnection: HubConnection;

  private characterMovedSource = new Subject<any>();
  characterMoved$ = this.characterMovedSource.asObservable();
  
  BASE_URL = 'https://localhost:44320';

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.BASE_URL + '/gamehub')
    .configureLogging(signalR.LogLevel.Information)  // Enable logging
    .build();
  }


  public startConnection = () => {

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public stopConnection = () => {
    this.hubConnection
      .stop()
      .then(() => console.log('Connection stopped'))
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
}