import { UserService } from './../../../user/user.service';
import { User } from './../../../user/User';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-collab',
  templateUrl: './list-collab.component.html',
  styleUrls: ['./list-collab.component.css']
})
export class ListCollabComponent implements OnInit {

  users: User[];
  currentComponent: String; // update = "U" ; Liste = "L" ; Details = "D"
  UserU: User;

  constructor(private UserService:UserService) 
  {
    this.currentComponent = 'L';
  }

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers(){
    this.UserService.getUsers().subscribe(res=>{
      this.users = res;
      console.log(this.users);
    } , err=>{
      alert(err);
    })
  }

  deleteUser(user){
    
    this.UserService.deleteUser(user).subscribe(res=>{
      alert(res);
      this.getUsers();
    } , err=>{
      alert(err);
    })
  }

  updateUser(user:User){

    this.currentComponent = 'U';
    this.UserU = user;

  }

  detailsUser(user: User){
    this.currentComponent = 'D';
    this.UserU = user;
  }

  recieveMessage($event){
    this.getUsers();
    this.currentComponent = $event;
  }

}
