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
}
