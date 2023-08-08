import { Component } from '@angular/core';
import { GetRequestsService } from '../services/get-requests.service';
import { NewsItem } from '../interfaces/news-item';

@Component({
  selector: 'tisp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  title = 'time-spender-frontend';
  randomNews: NewsItem = {} as NewsItem;

  constructor(private getRequestsService: GetRequestsService) {
  }

  ngOnInit(): void {
    this.getANews();
  }

  getANews() {
    this.getRequestsService.getOneNewsRequest().subscribe((data: any) => {
      console.log(data);
      this.randomNews = data;
    });
  }


}
