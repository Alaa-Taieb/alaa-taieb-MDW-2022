import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-action-side',
  templateUrl: './action-side.component.html',
  styleUrls: ['./action-side.component.css']
})
export class ActionSideComponent implements OnInit {

  @Input() message;


  constructor() { }

  ngOnInit(): void {
  }

}
