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
    this.stopTimer();
  }

  generateNumbers(): number[] {
    let numbers: number[] = [];
    while (numbers.length < 22) {
      let num = Math.floor(Math.random() * 200) + 1;
      if (numbers.indexOf(num) === -1) numbers.push(num);
    }
    return numbers;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.numbers, event.previousIndex, event.currentIndex);
    this.checkOrder();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.tenthsOfSecondPassed++;
    }, 100);
  }
  
  stopTimer() {
    clearInterval(this.timer);
  }

  hideRules() {
    this.showRules = false;
    this.startTimer();
  }

  restartGame() {
    this.numbers = this.generateNumbers();
    this.isGameOver = false;
    this.showRules = true;
    this.tenthsOfSecondPassed = 0;
    this.startTimer();
  }

  checkOrder() {
    let isCorrectOrder = true;
    for (let i = 0; i < this.numbers.length - 1; i++) {
      if (this.numbers[i] > this.numbers[i + 1]) {
        isCorrectOrder = false;
        break;
      }
    }
    if (isCorrectOrder) {
      this.stopTimer();
      this.isGameOver = true;
      this.newResult.username = this.currentUsername;
      this.newResult.timeInSeconds = this.tenthsOfSecondPassed / 10;
      this.tenthsOfSecondPassed = 0;
      this.postRequestsService.sendSortingGameResult(this.newResult).subscribe(
        () => {
          this.getRequestsService.getSortingGameResultsRequest().subscribe(
            (response) => {
              this.topList = response as SortingGameResult[];
          });
      });

    }
  }

}
