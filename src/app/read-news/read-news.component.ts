import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsItem } from '../interfaces/news-item';

@Component({
  selector: 'tisp-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.css']
})
export class ReadNewsComponent {
  title: string = 'time-spender-frontend';
  news: NewsItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    this.getNews().subscribe((data: any) => {
      console.log('News data:', data.articles);
      this.news = data.articles;
    });
  }
    
  getNews() {
    return this.http.get('/api/getnews');
  }
}
