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

  getMainPageOpinionsRequest() {
    return this.http.get(`${environment.backend_url}/api/opinion/getopinions`);
  }

  getOneNewsRequest() {
    return this.http.get(`${environment.backend_url}/api/getonenews`);
  }

  getSortingGameResultsRequest() {
    return this.http.get(`${environment.backend_url}/api/getsortinggameresults`);
  }

  getPageNewsRequest() {
    return this.http.get(`${environment.backend_url}/api/pagenews/getpagenews`);
  }

  getUsernamesRequest() {
    return this.http.get(`${environment.backend_url}/api/user/getusernames`);
  }
  
}