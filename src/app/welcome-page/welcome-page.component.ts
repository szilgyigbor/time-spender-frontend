import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {

  currentYear: string = "2023";
  newYear: any;
  wallpaper: any;
  
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.newYear = document.querySelector('#newYear')
    this.wallpaper = document.querySelector('.main')
    this.animateDescription();
  }

  async animateDescription() {

    console.log(this.newYear);
    await this.delay(3000);
    this.currentYear = this.currentYear.slice(0, -1);

    await this.delay(1200);
    this.currentYear += "4"

    await this.delay(2000);

    this.newYear.classList.remove('hidden');
    this.newYear.classList.add('visible');
    this.wallpaper.classList.add('background');

    await this.delay(5000);
    this.router.navigate(['/landing-page']);

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
