import { Component, OnInit } from '@angular/core';
import { GetRequestsService } from 'src/app/services/get-requests.service';

@Component({
  selector: 'tisp-show-usernames',
  templateUrl: './show-usernames.component.html',
  styleUrls: ['./show-usernames.component.css']
})
export class ShowUsernamesComponent implements OnInit {

  usernames: string[] = [];

  constructor(private getRequestService: GetRequestsService) { }

  ngOnInit(): void {
    this.getRequestService.getUsernamesRequest().subscribe((usernames: any) => {
      this.usernames = usernames;
    });
  }

}

