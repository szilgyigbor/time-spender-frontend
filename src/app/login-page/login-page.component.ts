import { Component } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';
import { UserData } from '../interfaces/user-data';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginData: UserData = {} as UserData;
  username: string = '';
  password: string = '';

  constructor(private postRequestsService: PostRequestsService, private loginService: LoginService, 
    private router: Router) { 
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
      this.loginService.setLoggedIn(true);
      this.router.navigate(['/']);

    });


    this.username = '';
    this.password = '';

    
  }

  ngOnInit(): void {
    
  }

}
