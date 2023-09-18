import { Component } from '@angular/core';

@Component({
  selector: 'tisp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  title = 'time-spender-frontend';
  backgroundImage = 'url("assets/background_app.jpg")';
  backgroundPosition = '0 0';
  points: any = [];

  constructor() {
  }

  ngOnInit(): void {
    const pageHeight = document.body.scrollHeight;
    this.backgroundPosition = `0 0, 0 ${pageHeight}px`;
  }
  
  createPoints() {
    for (let i= 0; i < 120; i++) {
      this.points.push({
        x: this.randomX(), 
        y: this.randomY(), 
      });
    }
  }

  randomX(): number {
    const pageWidth = window.innerWidth;
    const maxWidth = pageWidth > 768 ? pageWidth - 100 : pageWidth - 60;
    console.log(maxWidth);
    return Math.floor(Math.random() * maxWidth) + 30;
  }

  randomY(): number {
    const pageHeight = document.body.scrollHeight;
    return Math.floor(Math.random() * pageHeight) + 20;
  }
  

}
