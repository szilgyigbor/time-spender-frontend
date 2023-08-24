import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';
import { NewsItem } from 'src/app/interfaces/news-item';
import { GetRequestsService } from 'src/app/services/get-requests.service';

@Component({
  selector: 'tisp-news-slide',
  templateUrl: './news-slide.component.html',
  styleUrls: ['./news-slide.component.css']
})
export class NewsSlideComponent {
  news: NewsItem[] = [];
  slideState: string = 'left';

  currentSlideStartIndex: number = 0;
  currentSlideEndIndex: number = 3;

  displayedNews: NewsItem[] = [];

  constructor(private getRequestsService: GetRequestsService) { 
  }

  ngOnInit(): void {
    
    this.getRequestsService.getNewsRequest().subscribe({
      next: (data: any) => {
        this.news = data.articles;
        console.log(this.news);
        this.updateDisplayedNews();
      },
      error: (error: any) => {
        console.log(error);
      }
    });
    
    /*setInterval(() => this.next(), 10000);*/

  }

  updateDisplayedNews() {
    this.displayedNews = this.news.slice(this.currentSlideStartIndex, this.currentSlideEndIndex);
  }
  
  next() {
    this.slideState = 'right';
    if (this.currentSlideEndIndex < this.news.length - 1) {
      this.currentSlideStartIndex += 1;
      this.currentSlideEndIndex += 1;
      this.updateDisplayedNews();
    }
    else {
      this.currentSlideStartIndex = 0;
      this.currentSlideEndIndex = 3;
      this.updateDisplayedNews();
    }
  }
  
  prev() {
    this.slideState = 'left';
    if (this.currentSlideStartIndex > 0) {
      this.currentSlideStartIndex -= 1;
      this.currentSlideEndIndex -= 1;
      this.updateDisplayedNews();
    }
    else {
      this.currentSlideStartIndex = this.news.length - 3;
      this.currentSlideEndIndex = this.news.length;
      this.updateDisplayedNews();
    }
  }

}
