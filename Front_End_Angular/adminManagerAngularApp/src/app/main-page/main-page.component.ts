import { Component, OnInit , Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  loggedIn: boolean;  

  message;


  constructor(private router: Router) {
    
  }


 
  ngOnInit(): void {
    if(localStorage.getItem("JWT") == null){
      this.router.navigate(["login-page"]);
    }
  }

  public goToLogin():void {
    this.router.navigate(['/login-page']);
  }

  recieveMessage($event){
    if($event == this.message){
      this.message = null;
      console.log(this.message);
    }else{
      this.message = $event;
    }
  }

}
