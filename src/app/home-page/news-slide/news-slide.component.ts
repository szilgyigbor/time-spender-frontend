import { Component, OnInit } from '@angular/core';
import { PageNewsData } from 'src/app/interfaces/page-news-data';
import { GetRequestsService } from 'src/app/services/get-requests.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'tisp-news-slide',
  templateUrl: './news-slide.component.html',
  styleUrls: ['./news-slide.component.css'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-150%)' }),
        animate(1000)
      ]),
      transition('* => void', [
        animate(1000, style({ transform: 'translateX(150%)' }))
      ])
    ])
  ]
})
export class NewsSlideComponent {
  news: PageNewsData[] = [];
  displayedNews: PageNewsData = {} as PageNewsData;
  isShown: boolean = false;

  currentNewsIndex: number = 0;

  constructor(private getRequestsService: GetRequestsService) { 
  }

  ngOnInit(): void {
    
    this.getRequestsService.getPageNewsRequest().subscribe({
      next: (data: any) => {
        this.news = data;
        this.updateDisplayedNews();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    this.startSlideShow();

  }

  updateDisplayedNews() {
    this.displayedNews = this.news[this.currentNewsIndex];
  }

  startSlideShow() {
    const callback = () => {
      this.changeCard();
      setTimeout(callback, 15000);
    };
  
    callback();
  }
  
  changeCard() {
    this.isShown = true;
    if (this.currentNewsIndex < this.news.length - 1) {
      this.currentNewsIndex += 1;
      this.updateDisplayedNews();
    }
    else {
      this.currentNewsIndex = 0;
      this.updateDisplayedNews();
    }
    setTimeout(() => this.isShown = false, 13000);
  }
 
}
