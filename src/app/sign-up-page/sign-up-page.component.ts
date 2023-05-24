import { Component } from '@angular/core';

@Component({
  selector: 'tisp-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  username: string = '';
  password: string = '';
  email: string = '';
  passwordConfirm: string = '';

  constructor() { 
  }

  ngOnInit(): void {}

  sendSignUp() {

    if (this.password !== this.passwordConfirm) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Email:', this.email);
    

    this.username = '';
    this.password = '';
    this.email = '';
    this.passwordConfirm = '';
  }

}
