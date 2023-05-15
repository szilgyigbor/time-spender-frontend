import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

  constructor(private http: HttpClient) { }

  getNewsRequest() {
    return this.http.get('/api/getnews');
  }

}