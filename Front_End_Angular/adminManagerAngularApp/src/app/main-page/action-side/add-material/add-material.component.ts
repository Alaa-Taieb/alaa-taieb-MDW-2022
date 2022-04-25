import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role/Role';
import { RoleService } from 'src/app/role/role.service';
import { User } from 'src/app/user/User';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

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
