import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VisitData } from '../interfaces/visit-data';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  constructor(private http: HttpClient) { }

  getVisits() {
    return this.http.get<VisitData>(`${environment.backend_url}/api/getvisits`);
  }

  raiseVisitNumber() {
    return this.http.post<VisitData>(`${environment.backend_url}/api/raisevisitnumber`, {});
  }
}