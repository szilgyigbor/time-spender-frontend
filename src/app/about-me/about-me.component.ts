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
  }
  
}
