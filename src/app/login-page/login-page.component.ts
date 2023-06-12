import { Component } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';
import { UserData } from '../interfaces/user-data';

@Component({
  selector: 'tisp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginData: UserData = {} as UserData;
  username: string = '';
  password: string = '';

  constructor(private postRequestsService: PostRequestsService) { 
  }

  sendLogin() {

    this.loginData.username = this.username;
    this.loginData.password = this.password;
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    this.postRequestsService.sendLoginData(this.loginData).subscribe(response => {
      console.log('LoginData:', response);
      localStorage.setItem('currentUser', JSON.stringify(response));

      let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      console.log(currentUser.username);
      console.log(currentUser.email);

    });


    this.username = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

}
