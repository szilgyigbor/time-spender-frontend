import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'tisp-uni-dialog',
  templateUrl: './uni-dialog.component.html',
  styleUrls: ['./uni-dialog.component.css']
})
export class UniDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UniDialogComponent>) { }

  closeDialog(result: string): void {
    this.dialogRef.close(result);
  }
}
