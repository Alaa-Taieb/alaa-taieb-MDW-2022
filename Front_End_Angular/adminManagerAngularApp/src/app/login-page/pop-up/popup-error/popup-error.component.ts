import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-popup-error',
  templateUrl: './popup-error.component.html',
  styleUrls: ['./popup-error.component.css']
})
export class PopupErrorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopupErrorComponent> , @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.error = data.error;
    this.type = data.type;
   }

  public message;
  public error;
  public type;

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
