import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user/User';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  user:User;


  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem("LoggedUser"));
  }


 
  ngOnInit(): void {
  }

  public goToLogin():void {
    this.router.navigate(['/login-page']);
  }

  public logout(){
    localStorage.removeItem("JWT");
    localStorage.removeItem("LoggedUser");
    this.router.navigate(['/login-page']);
  }

}
