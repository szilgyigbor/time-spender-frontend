import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'tisp-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.css']
})
export class ReadNewsComponent {
  title: string = 'time-spender-frontend';
  news: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    /* this.getNews().pipe(
      tap((data: any) => {
        console.log('News data:', data);
        this.news = data;
      }),
    ).subscribe(); */
  }
    
  getNews() {
    return this.http.get('/api/getnews');
  }

}
