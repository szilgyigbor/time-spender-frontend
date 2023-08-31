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
  backgroundImage = 'url("assets/background_app.jpg")';
  backgroundPosition = '0 0';

  constructor(private getRequestsService: GetRequestsService) {
  }

  ngOnInit(): void {
    this.getANews();
    const pageHeight = document.body.scrollHeight;
    this.backgroundPosition = `0 0, 0 ${pageHeight}px`;

  }

  getANews() {
    this.getRequestsService.getOneNewsRequest().subscribe((data: any) => {
      this.randomNews = data;
    });
  }


}
