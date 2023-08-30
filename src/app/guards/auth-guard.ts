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
    return true;
  }
}
