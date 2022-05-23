import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.css']
})
export class ConfirmationPopupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationPopupComponent>) { }

  public title: string;
  public confirmMessage: string;
  public type: string;
  public moreInfo: any

  ngOnInit(): void {
  }

}
