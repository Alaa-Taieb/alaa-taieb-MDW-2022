import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/role/Role';
import { RoleService } from 'src/app/role/role.service';
import { User } from 'src/app/user/User';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-update-collab',
  templateUrl: './update-collab.component.html',
  styleUrls: ['./update-collab.component.css']
})
export class UpdateCollabComponent implements OnInit {

  @Input() user:User;

  @Output() updatingUserEvent = new EventEmitter();

  name;
  secondName;
  birthday;
  role_id;
  email;
  phoneNumber;
  username;
  password;
  password2;

  roles: Role[];

  constructor(private userService:UserService , private roleService:RoleService) { }

  ngOnInit(): void {
    this.getRoles();
    this.loadUserToForm();
  }

  updateUser(){
    let user:User;
    let role;
    for(let i = 0 ; i < this.roles.length ; i++){
      if(this.roles[i].id == this.role_id){
        role = this.roles[i];
        break;
      }
    }

    user = {
      id: this.user.id,
      name: this.name,
      secondName : this.secondName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthday: this.birthday,
      login: this.username,
      role: role,
      password: this.password
    }

    this.userService.updateUser(user).subscribe(res=>{
      console.log(res);
      this.changeStatus();
      
    } , err=>{
      console.log(err);
    })
  }

  getRoles(){
    this.roleService.getRoles().subscribe(res=>{
      this.roles = res;
      console.log(res);
    } , err=>{
      console.log(err);
    })
  }

  clearAll(){
    this.name = '';
    this.secondName = '';
    this.email = '';
    this.phoneNumber = null;
    this.username = '';
    this.birthday = '';
    this.role_id = null;
    this.password = '';
    this.password2 = '';
  }

  loadUserToForm(){
    this.name = this.user.name;
    this.secondName = this.user.secondName;
    this.email = this.user.email;
    this.phoneNumber = this.user.phoneNumber;
    this.username = this.user.login;
    this.birthday = this.user.birthday.slice(0,10);
    this.role_id = this.user.role.id;
  }

  changeStatus(){
    this.updatingUserEvent.emit('L');
  }

}
