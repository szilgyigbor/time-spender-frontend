import { Component } from '@angular/core';

@Component({
  selector: 'tisp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  title = 'time-spender-frontend';
  points: any = [];
  pageWidth: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.pageWidth = window.innerWidth;
    this.createPoints();
  }
  
  createPoints() {
    for (let i= 0; i < 30; i++) {
      this.points.push({
        x: this.randomX(), 
        y: this.randomY(), 
      });
    }
  }

  randomX(): number {
    const maxWidth = this.pageWidth > 768 ? this.pageWidth - 100 : this.pageWidth - 60;
    return Math.floor(Math.random() * maxWidth) + 30;
  }

  randomY(): number {
    const maxHeight = this.pageWidth > 768 ? 2200 : 1500;
    return Math.floor(Math.random() * maxHeight) + 20;
  }
  

}
