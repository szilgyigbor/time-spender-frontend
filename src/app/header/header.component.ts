import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tisp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  private themeSubscription?: Subscription;
  currentUser: any = null;
  isLoggedIn$ = this.loginService.isLoggedIn$;
  isDarkMode: boolean = true;

  constructor(private loginService: LoginService, private themeService: ThemeService) { 
    this.isLoggedIn$.subscribe((isLoggedIn: any) => {
      if (isLoggedIn) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
      } else {
        this.currentUser = null;
      }
    });
  }

  ngOnInit() {
    this.themeSubscription = this.themeService.isDarkMode$.subscribe(value => {
      this.isDarkMode = value;
    });
  }
    
  ngOnDestroy() {
    this.themeSubscription?.unsubscribe();
  }

  logout() {
    localStorage.clear();
    this.loginService.setLoggedIn(false);
  }


  toggleMode() {
    this.themeService.toggleTheme();
  }

}
