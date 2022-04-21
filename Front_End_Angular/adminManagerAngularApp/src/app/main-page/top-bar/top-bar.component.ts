import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  public username;

  constructor(private router: Router) {
    this.username = JSON.parse(localStorage.getItem("LoggedUser")).login;
  }


 
  ngOnInit(): void {
  }

  public goToLogin():void {
    localStorage.removeItem("JWT");
    localStorage.removeItem("LoggedUser");
    this.router.navigate(['/login-page']);
  }

}
