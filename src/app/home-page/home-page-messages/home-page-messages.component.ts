import { Component } from '@angular/core';
import { MessageData } from 'src/app/interfaces/message-data';
import { PostRequestsService } from 'src/app/services/post-requests.service';
import { GetRequestsService } from 'src/app/services/get-requests.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'tisp-home-page-messages',
  templateUrl: './home-page-messages.component.html',
  styleUrls: ['./home-page-messages.component.css']
})
export class HomePageMessagesComponent {

  messagesData: MessageData[] = [];
  newMessage: MessageData = {} as MessageData;
  messageContent: string = '';
  userName: string = '';

  constructor(private getRequestService: GetRequestsService, private postRequestService: PostRequestsService,
    private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getAllMessages();
  }

  sendMessage() {
    if (!!localStorage.getItem('currentUser') ==  false) {
      alert('You must be logged in to use this feature!');
      this.router.navigate(['/login']);
    }
    this.userName = JSON.parse(localStorage.getItem('currentUser')!).username;
    this.newMessage.id = 0;
    this.newMessage.username = this.userName;
    this.newMessage.message = this.messageContent;
    this.newMessage.postedAt = new Date().toISOString()
    this.messageContent = '';
    this.postRequestService.sendMainPageMessage(this.newMessage).subscribe({
      next: () => {
        this.getAllMessages();
      },
      error: error => {
        if (!!localStorage.getItem('currentUser') ==  true)
          {
            localStorage.removeItem('currentUser');
            alert("Your token has expired, please login!");
            this.router.navigate(['/login']);
          }
          else {
            alert("Please, login!");
            this.router.navigate(['/login']);
          }
      }
    });
  }

  getAllMessages() {
    this.getRequestService.getMainPageMessagesRequest().subscribe((messageData) => {
      this.messagesData = (messageData as MessageData[]).sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    });
  }

}
