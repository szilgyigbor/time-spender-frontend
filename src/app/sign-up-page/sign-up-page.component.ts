import { Component } from '@angular/core';
import { PostRequestsService } from '../services/post-requests.service';
import { SignUpData } from '../interfaces/sign-up-data';

@Component({
  selector: 'tisp-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  signUpData: SignUpData = {} as SignUpData;
  passwordConfirm: string = '';

  constructor(private postRequestsService: PostRequestsService) { 
  }

  ngOnInit(): void {}

  sendSignUp() {

    if (this.signUpData.password !== this.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Username:', this.signUpData.username);
    console.log('Password:', this.signUpData.password);
    console.log('Email:', this.signUpData.email);

    this.postRequestsService.sendSignUpData(this.signUpData).subscribe(response => {
      console.log('SignUpData:', response);
    });


    this.signUpData.username = '';
    this.signUpData.password = '';
    this.signUpData.email = '';
    this.passwordConfirm = '';
  }

}
