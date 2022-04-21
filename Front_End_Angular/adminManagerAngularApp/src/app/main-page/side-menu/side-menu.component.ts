import { Component, OnInit, Output } from '@angular/core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBoxOpen, faUsers } from '@fortawesome/free-solid-svg-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public faUser = faUsers;
  public faBoxOpen = faBoxOpen;
  public message = null;

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

}
