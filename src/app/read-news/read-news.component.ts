import { Component } from '@angular/core';
import { NewsItem } from '../interfaces/news-item';
import { GetRequestsService } from '../services/get-requests.service';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';

@Component({
  selector: 'tisp-read-news',
  templateUrl: './read-news.component.html',
  styleUrls: ['./read-news.component.css']
})
export class ReadNewsComponent {
  title: string = 'time-spender-frontend';
  news: NewsItem[] = [];

  constructor(private getRequestsService: GetRequestsService, private router: Router, 
    private dialogService: DialogService ) { 
      if (!!localStorage.getItem('currentUser') ==  false) {
        this.dialogService.openDialog('You must be logged in to use this feature!', '/login');
      }
  }

  ngOnInit(): void {
    
    this.getRequestsService.getNewsRequest().subscribe({
      next: (data: any) => {
        this.news = data.articles;
      },
      error: (error: { status: number; }) => {
        if (error.status === 401) {
          if (!!localStorage.getItem('currentUser') ==  true)
          {
            localStorage.removeItem('currentUser');
            alert("Your token has expired, please login!");
            this.router.navigate(['/login']);
          }
          else {
            this.dialogService.openDialog('You must be logged in to use this feature!', '/login');
          }
        }
      }
    });

  }
 
}
