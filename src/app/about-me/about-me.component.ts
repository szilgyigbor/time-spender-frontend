import { Component } from '@angular/core';

@Component({
  selector: 'tisp-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent {

  descriptions: string[] = ["szoftverfejlesztő", "álmodozó", "dota2 legenda", "szerető férj"];
  currentDescriptionIndex: number = 0;
  currentDescription: string = this.descriptions[0];
  
  constructor() {
  }

  ngOnInit(): void {

  async animateDescription() {
    while (true) {

      this.currentDescriptionIndex = (this.currentDescriptionIndex + 1) % this.descriptions.length;

      await this.delay(5000);

      while (this.currentDescription.length > 0) {
        this.currentDescription = this.currentDescription.slice(0, -1);
        await this.delay(100);
      }

      await this.delay(1000);

      const targetDescription = this.descriptions[this.currentDescriptionIndex];
      for (let i = 0; i <= targetDescription.length; i++) {
        this.currentDescription = targetDescription.slice(0, i);
        await this.delay(250);
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
}
