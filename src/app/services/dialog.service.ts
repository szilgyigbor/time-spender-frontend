import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UniDialogComponent } from '../uni-dialog/uni-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private router: Router) { }

  openDialog(message: string, navigateTo?: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(UniDialogComponent, {
        data: { message: message },
        disableClose: true,
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'ok' && navigateTo) {
          this.router.navigate([navigateTo]);
          resolve(true);
        } else if (result === 'ok') {
          resolve(true);
        }
          else if (result === 'cancel') {
          resolve(false);
        }
      });
    });
  }
}