import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

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

  constructor(private loginService: LoginService, private themeService: ThemeService, 
    private dialogService: DialogService) { 
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
    this.dialogService.openDialog('Ki szeretnél jelentkezni?').then(result => {
      if (result) {
        this.loginService.setLoggedIn(false);
        localStorage.clear();
      } 
      else {
        return;
      }
    });
  }

  toggleMode() {
    this.themeService.toggleTheme();
  }

}
