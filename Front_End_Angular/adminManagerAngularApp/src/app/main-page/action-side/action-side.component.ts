import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-action-side',
  templateUrl: './action-side.component.html',
  styleUrls: ['./action-side.component.css']
})
export class ActionSideComponent implements OnInit {

  @Input() loggedIn: boolean;
  @Input() username: String;
  @Input() password: String;

  @Input() menuMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
