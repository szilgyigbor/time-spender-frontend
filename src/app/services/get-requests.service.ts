import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

  //backend_url = 'https://spender-backend-7753b2e4b87a.herokuapp.com';
  backend_url = '';


  constructor(private http: HttpClient) { }

  getNewsRequest() {
    return this.http.get(this.backend_url + '/api/getnews');
  }

  getMainPageMessagesRequest() {
    return this.http.get(this.backend_url + '/api/messages/getmessages');
  }
    

}