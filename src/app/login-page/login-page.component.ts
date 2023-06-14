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

  constructor(private postRequestsService: PostRequestsService, private loginService: LoginService, 
    private router: Router) { 
  }

  sendLogin() {
   
    this.postRequestsService.sendLoginData(this.loginData).subscribe(response => {
      console.log('LoginData:', response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.loginService.setLoggedIn(true);
      this.router.navigate(['/']);
    },
    error => {
      if (error.status === 401 || error.status === 400) {
        alert("Username or password is incorrect!");
      }
    });
  }

  ngOnInit(): void {
  }

}
