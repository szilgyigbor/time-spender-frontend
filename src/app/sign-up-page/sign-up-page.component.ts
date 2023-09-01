import { Component } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';
import { UserData } from '../interfaces/user-data';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'tisp-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  signUpData: UserData = {} as UserData;
  passwordConfirm: string = '';

  constructor(private postRequestsService: PostRequestsService, private loginService: LoginService, 
    private router: Router) { 
  }

  ngOnInit(): void {}

  sendSignUp() {

    if (this.signUpData.username == undefined || this.signUpData.email == undefined) {
      alert('Any field cant be empty!');
      return;
    }


    if (this.signUpData.password !== this.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    this.signUpData.registratedAt = new Date().toISOString();
    this.signUpData.isAdmin = false;
    this.signUpData.isFriend = false;
    this.signUpData.id = 0;

    this.postRequestsService.sendSignUpData(this.signUpData).subscribe((response: any) => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.loginService.setLoggedIn(true);
      this.router.navigate(['/']);
    });

  }

}
