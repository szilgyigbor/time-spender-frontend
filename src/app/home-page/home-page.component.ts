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
  
}
