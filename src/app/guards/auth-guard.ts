import { Injectable } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { LoginService } from '../services/login.service';

@Injectable({providedIn: 'root'})
export class AdminGuard {
  constructor(private dialogService: DialogService, private loginService: LoginService) {}
  
  canActivate(): boolean {

    if (!!localStorage.getItem('currentUser') ==  false) {
      this.dialogService.openDialog('Be kell jelentkezned, hogy használni tudd ezt.', '/login');
      return false;
    }
    
    const currentTime = new Date().getTime();
    const expiresTime = new Date(JSON.parse(localStorage.getItem('currentUser')!).expires_at).getTime();

    if (currentTime > expiresTime) {
        this.dialogService.openDialog('Lejárt a bejelentkezésed, lépj be újra!', '/login');
        this.loginService.removeLoggedIn();
        return false;
    }
    
    return true;
  }
}
