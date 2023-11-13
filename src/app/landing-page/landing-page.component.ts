import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { VisitorService } from '../services/visitor.service';
import { VisitData } from '../interfaces/visit-data';

@Component({
  selector: 'tisp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements AfterViewInit{

  visitData: VisitData = {
    id: 0,
    allVisits: 0,
    lastVisit: new Date()
  };

  @ViewChild('lastCard') private lastCard!: ElementRef;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    const divs = Array.from(document.querySelectorAll('.card'));
    for (const div of divs) {
      if (div.getBoundingClientRect().top < window.innerHeight - 250) {
        div.classList.remove('hidden');
        div.classList.add('visible');
      } else {
        div.classList.remove('visible');
        div.classList.add('hidden');
      }
    }
  }

  constructor(private visitorService: VisitorService) { }

  ngOnInit() {
    this.checkVisitor();
  }

  ngAfterViewInit() {
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
