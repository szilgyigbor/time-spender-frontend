import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GetRequestsService {

  constructor(private http: HttpClient) { }

  getNewsRequest() {
    return this.http.get(`${environment.backend_url}/api/getnews`);
  }

  getMainPageMessagesRequest() {
    return this.http.get(`${environment.backend_url}/api/messages/getmessages`);
  }

  getOneNewsRequest() {
    return this.http.get(`${environment.backend_url}/api/getonenews`);
  }

  getSortingGameResultsRequest() {
    return this.http.get(`${environment.backend_url}/api/getsortingresults`);
  }
  
}