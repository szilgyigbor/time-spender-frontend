import { Component } from '@angular/core';
import { VisitorService } from '../services/visitor.service';
import { VisitData } from '../interfaces/visit-data';

@Component({
  selector: 'tisp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent {

  visitData: VisitData = {
    id: 0,
    allVisits: 0,
    lastVisit: new Date()
  };

  constructor(private visitorService: VisitorService) { }
  private createVisitor(): void {
    const visitor = {
      date: new Date().toISOString()
    };
    
    localStorage.setItem('Visitor', JSON.stringify(visitor));
  }

  private updateVisitor(): void {
    const updatedVisitor = {
      date: new Date().toISOString()
    };
    
    localStorage.setItem('Visitor', JSON.stringify(updatedVisitor));
  }

}
