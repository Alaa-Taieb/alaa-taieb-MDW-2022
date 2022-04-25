import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/user/User';

@Component({
  selector: 'app-details-collab',
  templateUrl: './details-collab.component.html',
  styleUrls: ['./details-collab.component.css']
})
export class DetailsCollabComponent implements OnInit {

  @Input() user:User;

  @Output() updatingUserEvent = new EventEmitter();
  arrow = faCaretLeft;

  constructor() { }

  ngOnInit(): void {
    
  }

  changeStatus(){
    this.updatingUserEvent.emit("L");
  }

}
