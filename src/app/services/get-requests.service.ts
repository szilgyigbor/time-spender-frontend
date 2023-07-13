import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

  constructor(private http: HttpClient) { }

  getNewsRequest() {
    return this.http.get('https://spender-backend-7753b2e4b87a.herokuapp.com/api/getnews');
  }

}