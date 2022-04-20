import { UserService } from './../user/user.service';
import { PopupErrorComponent } from './pop-up/popup-error/popup-error.component';
import { Component, OnInit, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './auth/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private matDialog: MatDialog,
    private userService: UserService
    ) { 
  }
  
  ngOnInit() {

    if(localStorage.getItem("JWT") != null){
      this.router.navigate(['/'])
    }

  }

  handleLogin() {
    this.authenticationService.authenticate(this.username, this.password).subscribe((result)=> {
      console.log(result);
      localStorage.setItem("JWT", result.jwt);
      
      this.saveUserInStorage(this.username);
      setTimeout( () => {this.router.navigate(['/'])} , 30)
      
     
    }, (err) => {
      console.log(err);
      this.invalidLogin = true;
      this.loginSuccess = false;
      this.openDialog();
    });      
  }

  public test():void {
    alert(this.username+' '+this.password);
  }

  openDialog(){
    
    this.matDialog.open(PopupErrorComponent , {
      height: '200px',
      width: '350px',
      panelClass: 'custom-modalbox',
      data: { message: "Erreur d'authentification" , error: "Des informations d'identification erronées ont été saisies, veuillez réessayer !" , type: "error"}
    });
  }

  saveUserInStorage(username: string){
    this.userService.getUserByUsername(username).subscribe(result => {
      localStorage.setItem("LoggedUser" , JSON.stringify(result));
    })
  }

}
