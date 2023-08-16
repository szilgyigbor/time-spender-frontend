import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SortingGameResult } from '../interfaces/sorting-result-data';
import { PostRequestsService } from '../services/post-requests.service';
import { GetRequestsService } from '../services/get-requests.service';
import { Router } from '@angular/router';


@Component({
  selector: 'tisp-number-sorting',
  templateUrl: './number-sorting.component.html',
  styleUrls: ['./number-sorting.component.css']
})
export class NumberSortingComponent {

  showRules: boolean = true;
  isGameOver: boolean = false;
  numbers: number[] = this.generateNumbers();
  timer: any;
  tenthsOfSecondPassed: number = 0;
  newResult: SortingGameResult = {} as SortingGameResult;
  topList: SortingGameResult[] = [];
  currentUsername: string = "";

  constructor(private postRequestsService: PostRequestsService, private getRequestsService: GetRequestsService,
    private router: Router) {
    if (!!localStorage.getItem('currentUser') ==  false) {
      alert('You must be logged in to use this feature!');
      this.router.navigate(['/login']);}
    else {
      this.currentUsername = JSON.parse(localStorage.getItem('currentUser')!).username;
    }
  }

  ngOnInit() {
    this.getRequestsService.getSortingGameResultsRequest().subscribe(
      (response) => {
        this.topList = response as SortingGameResult[];
    });
  }

  ngOnDestroy() {
  }

  generateNumbers(): number[] {
    let numbers: number[] = [];
    while (numbers.length < 22) {
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
