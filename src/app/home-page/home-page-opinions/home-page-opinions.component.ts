import { Component } from '@angular/core';
import { MessageData } from 'src/app/interfaces/message-data';
import { PostRequestsService } from 'src/app/services/post-requests.service';
import { GetRequestsService } from 'src/app/services/get-requests.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'tisp-home-page-opinions',
  templateUrl: './home-page-opinions.component.html',
  styleUrls: ['./home-page-opinions.component.css']
})
export class HomePageOpinionsComponent {

  messagesData: MessageData[] = [];
  newMessage: MessageData = {} as MessageData;
  messageContent: string = '';
  userName: string = '';

  constructor(private getRequestService: GetRequestsService, private postRequestService: PostRequestsService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllMessages();
  }

  sendMessage() {
    if (!!localStorage.getItem('currentUser') ==  false) {
      this.dialogService.openDialog('You must be logged in to use this feature!', '/login');
      return;
    }

    else if (this.messageContent == '' || this.messageContent == ' ') {
      this.dialogService.openDialog('You cannot send empty message!');
      return;
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
      error: (error) => {
        console.log('Error', error);
      }
    });
  }

  getAllMessages() {
    this.getRequestService.getMainPageMessagesRequest().subscribe((messageData : any) => {
      this.messagesData = (messageData as MessageData[]).sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    });
  }

}
