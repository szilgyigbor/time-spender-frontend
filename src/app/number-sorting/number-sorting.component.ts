import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'tisp-number-sorting',
  templateUrl: './number-sorting.component.html',
  styleUrls: ['./number-sorting.component.css']
})
export class NumberSortingComponent {

  sourceNumbers: number[] = this.generateNumbers();
  targetNumbers: number[] = [];
  timer: any;
  secondsPassed: number = 0;

}
