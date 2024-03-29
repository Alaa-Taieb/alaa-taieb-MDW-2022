import { User } from './../../../user/User';
import { RoleService } from './../../../role/role.service';
import { UserService } from './../../../user/user.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role/Role';

@Component({
  selector: 'app-add-collab',
  templateUrl: './add-collab.component.html',
  styleUrls: ['./add-collab.component.css']
})
export class AddCollabComponent implements OnInit {

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
  }

  addUser(){
    let user:User;
    let role;
    for(let i = 0 ; i < this.roles.length ; i++){
      if(this.roles[i].id == this.role_id){
        role = this.roles[i];
        break;
      }
    }

    user = {
      name: this.name,
      secondName : this.secondName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      birthday: this.birthday,
      login: this.username,
      role: role,
      password: this.password
    }
    
    this.userService.addUser(user).subscribe(res=>{
      alert(res);
    } , err=>{
      alert(err);
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
}
