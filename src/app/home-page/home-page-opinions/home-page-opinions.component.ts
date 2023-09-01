import { Component } from '@angular/core';
import { OpinionData } from 'src/app/interfaces/opinion-data';
import { PostRequestsService } from 'src/app/services/post-requests.service';
import { GetRequestsService } from 'src/app/services/get-requests.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'tisp-home-page-opinions',
  templateUrl: './home-page-opinions.component.html',
  styleUrls: ['./home-page-opinions.component.css']
})
export class HomePageOpinionsComponent {

  opinionData: OpinionData[] = [];
  newOpinion: OpinionData = {} as OpinionData;
  opinionContent: string = '';
  userName: string = '';

  constructor(private getRequestService: GetRequestsService, private postRequestService: PostRequestsService,
    private dialogService: DialogService) { }

  ngOnInit(): void {
    this.getAllOpinions();
  }

  sendOpinion() {
    if (!!localStorage.getItem('currentUser') ==  false) {
      this.dialogService.openDialog('You must be logged in to use this feature!', '/login');
      return;
    }

    else if (this.opinionContent == '' || this.opinionContent == ' ') {
      this.dialogService.openDialog('You cannot send empty message!');
      return;
    }

    this.userName = JSON.parse(localStorage.getItem('currentUser')!).username;
    this.newOpinion.id = 0;
    this.newOpinion.username = this.userName;
    this.newOpinion.message = this.opinionContent;
    this.newOpinion.postedAt = new Date().toISOString()
    this.opinionContent = '';
    this.postRequestService.sendMainPageOpinion(this.newOpinion).subscribe({
      next: () => {
        this.getAllOpinions();
      },
      error: (error) => {
        console.log('Error', error);
      }
    });
  }

  getAllOpinions() {
    this.getRequestService.getMainPageOpinionsRequest().subscribe((opinionData : any) => {
      this.opinionData = (opinionData as OpinionData[]).sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    });
  }

}
