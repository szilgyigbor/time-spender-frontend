import { Component } from '@angular/core';
import { NewsItem } from '../interfaces/news-item';
import { GetRequestsService } from '../services/get-requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.css']
})
export class ReadNewsComponent {
  title: string = 'time-spender-frontend';
  news: NewsItem[] = [];

  constructor(private getRequestsService: GetRequestsService, private router: Router ) { }

  ngOnInit(): void {
    
    this.getRequestsService.getNewsRequest().subscribe((data: any) => {
      console.log('News data:', data.articles);
      this.news = data.articles;
    },
    error => {
      if (error.status === 401) {
        alert("Please, login!");
        this.router.navigate(['/login']);
      }
    }
    
    );
  }
 
}
