import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'alert-dialog',
  templateUrl: './alert-dialog.html', 
  styleUrls: ['./alert-dialog.css']
})
export class AlertDialogComponent {
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
}