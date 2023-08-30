import { Injectable } from '@angular/core';
import { DialogService } from '../services/dialog.service';

@Injectable({providedIn: 'root'})
export class AdminGuard {
  constructor(private dialogService: DialogService) {}
  
  canActivate(): boolean {

    if (!!localStorage.getItem('currentUser') ==  false) {
      this.dialogService.openDialog('You must be logged in to use this feature!', '/login');
      return false;
    }
    
    const currentTime = new Date().getTime();
    const expiresTime = new Date(JSON.parse(localStorage.getItem('currentUser')!).expires_at).getTime();

    if (currentTime > expiresTime) {
        this.dialogService.openDialog('Your session has expired. Please log in again.', '/login');
        return false;
    }
    
    return true;
  }
}
