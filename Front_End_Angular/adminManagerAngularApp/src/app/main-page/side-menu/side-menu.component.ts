import { Component, OnInit, Output } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBoxOpen, faCaretDown, faCaretUp, faEnvelope, faFileMedical, faHeadset, faInbox, faUsers } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public downArrow = faCaretDown;
  public upArrow = faCaretUp;
  public inbox = faEnvelope;
  public faUser = faUsers;
  public faBoxOpen = faBoxOpen;
  public faFileMedical = faFileMedical;
  public message = null;
  public envoiDropDown = false;
  public receptionDropDown = false;
  public faHeadset = faHeadset;

  @Output() messageEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public sendMessage(message){
    if(message == this.message){
      this.message = null;
    }else{
      this.message = message;
    }
    this.messageEvent.emit(message)
  }

  envoiDropDownSwitch(){
    this.envoiDropDown = !this.envoiDropDown;
  }

  receptionDropDownSwitch(){
    this.receptionDropDown = !this.receptionDropDown;
  }
 
}
