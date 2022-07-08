import { Router } from '@angular/router';
import { UserService } from './../../user/user.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/user/User';

@Component({
  selector: 'app-collab-account',
  templateUrl: './collab-account.component.html',
  styleUrls: ['./collab-account.component.css']
})
export class CollabAccountComponent implements OnInit {

  @Output() view = new EventEmitter();
  user: User;
  name: string;
  secondName: string;
  email: string;
  phoneNumber;
  birthday;
  username: string;
  constructor(private userService: UserService , private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("LoggedUser"));
    this.loadUser();
  }

  cancel(){
    this.view.emit('Dashboard');
  }

  loadUser(){
    this.name =this.user.name;
    this.secondName = this.user.secondName;
    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber;
    this.username = this.user.login;
    this.birthday = this.user.birthday;
  }

  save(){
    let b = new Date(this.birthday);
    b.setDate(b.getDate()+1)
    let user: User = {
      id: this.user.id,
      name: this.name,
      secondName: this.secondName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthday: b.toISOString(),
      login: this.username,
      role:this.user.role
    }
    console.log(user);
    this.userService.updateUser(user).subscribe(res => {
      console.log(res);
      localStorage.setItem("LoggedUser" , JSON.stringify(res))
      this.user = res;
      this.loadUser();
    } , err => {
      console.log(err);
    })
  }

}
