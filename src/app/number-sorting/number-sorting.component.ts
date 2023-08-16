import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'tisp-number-sorting',
  templateUrl: './number-sorting.component.html',
  styleUrls: ['./number-sorting.component.css']
})
export class NumberSortingComponent {

  isGameOver: boolean = false;
  numbers: number[] = this.generateNumbers();
  timer: any;
  secondsPassed: number = 0;

  generateNumbers(): number[] {
    let numbers: number[] = [];
    while (numbers.length < 20) {
      let num = Math.floor(Math.random() * 200) + 1;
      if (numbers.indexOf(num) === -1) numbers.push(num);
    }
    return numbers;
  }

  onDrop(event: CdkDragDrop<number[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.secondsPassed++;
    }, 1000);
  }
  
  stopTimer() {
    clearInterval(this.timer);
  }

  checkOrder() {
    let isCorrectOrder = true;
    for (let i = 0; i < this.targetNumbers.length - 1; i++) {
      if (this.targetNumbers[i] > this.targetNumbers[i + 1]) {
        isCorrectOrder = false;
        break;
      }
    }
    if (isCorrectOrder) {
      this.stopTimer();
      // Mentés az adatbázisba...
    }
  }

}
