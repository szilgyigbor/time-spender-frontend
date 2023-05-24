import { Component } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';

@Component({
  selector: 'tisp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  username: string = '';
  password: string = '';

  constructor(private postRequestsService: PostRequestsService) { 
  }

  sendLogin() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

}
