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

  ngOnInit(): void {
    this.checkVisitor();
  }

  private checkVisitor(): void {
    const storedVisitor = localStorage.getItem('Visitor');
    
    if (storedVisitor) {
      const storedDate = new Date(JSON.parse(storedVisitor).date);
      const currentDate = new Date();
      
      const timeDifference = Math.abs(currentDate.getTime() - storedDate.getTime()) / 60000;

      if (timeDifference > 10) {
        this.updateVisitor();
        this.visitorService.raiseVisitNumber().subscribe(
          (data) => {
            this.visitData = data;
          }
        );
      } else {
        this.visitorService.getVisits().subscribe(
          (data) => {
            this.visitData = data;
          }
        );
      }
      
    } else {
      this.createVisitor();
      this.visitorService.raiseVisitNumber().subscribe(
        (data) => {
          this.visitData = data;
        }
      );
      
    }
  }

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
