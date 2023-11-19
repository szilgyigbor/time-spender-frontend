import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tisp-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.css']
})
export class ParallaxComponent {
  
  @ViewChild('text')
  text!: ElementRef;

  @ViewChild('tree_left')
  treeLeft!: ElementRef;

  @ViewChild('tree_right')
  treeRight!: ElementRef;

  @ViewChild('gate_left')
  gateLeft!: ElementRef;

  @ViewChild('gate_right')
  gateRight!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      const value = window.scrollY;
      this.text.nativeElement.style.marginTop = value * 2.5 + 'px';
      this.treeLeft.nativeElement.style.left = value * -1.0 + 'px';
      this.treeRight.nativeElement.style.left = value * 1.0 + 'px';
      this.gateLeft.nativeElement.style.left = value * 0.3 + 'px';
      this.gateRight.nativeElement.style.left = value * -0.3 + 'px';

    });
  }

}
