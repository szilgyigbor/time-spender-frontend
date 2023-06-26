import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'tisp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  currentUser: any = null;

  isLoggedIn$ = this.loginService.isLoggedIn$;

  constructor(private loginService: LoginService) { 
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      } else {
        this.currentUser = null;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.loginService.setLoggedIn(false);
  }

  ngOnInit(): void {

  }

}
