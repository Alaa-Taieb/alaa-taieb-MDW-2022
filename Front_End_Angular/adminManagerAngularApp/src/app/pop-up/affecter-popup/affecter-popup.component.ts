import { SerialNumberService } from './../../serialNumber/serial-number.service';
import { UserService } from './../../user/user.service';
import { SerialNumber } from 'src/app/serialNumber/SerialNumber';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/user/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-affecter-popup',
  templateUrl: './affecter-popup.component.html',
  styleUrls: ['./affecter-popup.component.css']
})
export class AffecterPopupComponent implements OnInit {

  constructor(private toastr: ToastrService , public dialogRefL: MatDialogRef<AffecterPopupComponent> , private userService: UserService , private serialNumberService: SerialNumberService) { }

  public serialNumber: SerialNumber;
  public users: User[];
  public selectedUser: User;
  public searchText: string;

  ngOnInit(): void {
    this.getUsers();
    console.log(this.serialNumber);
    
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      if(this.serialNumber.appointed){
        this.selectedUser = this.getUserFromUsers(this.serialNumber.user.id);
        console.log(this.selectedUser == this.users[1]);
  
      }
    } , err => {
      this.notifyError(err);
    })
  }

  getUserFromUsers(id: number){
    let user: User;
    this.users.forEach(u => {
      if(u.id == id){
        user = u;
      }
    })
    return user;
  }

  notifyError(message: string){
    this.toastr.error(`${message}`, 'Error' , {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
      closeButton: true
    });
  }

  notifySuccess(message : string){
    this.toastr.success(`${message}`, 'Success' , {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
      closeButton: true
    });
  }

  selectUser(id: number){
    this.users.forEach(user => {
      if(user.id == id){
        this.selectedUser = user;
      }
    })
  }

  deselectUser(){
    this.selectedUser = undefined;
  }

  confirmSelection(){
    let serialNumber = this.serialNumber;
    serialNumber.user = this.selectedUser;
    if(this.selectedUser != undefined){
      serialNumber.appointed = true;
    }else{
      serialNumber.appointed = false;
    }
    this.serialNumberService.updateSerialNumber(serialNumber).subscribe(res =>{
      let message: string;
      if(this.selectedUser == undefined){
        message = "Stock";
      }else{
        message = this.selectedUser.login;
      }
      this.notifySuccess(`${serialNumber.number} assigned to ${message}!`);
      this.dialogRefL.close(true);
    } , err =>{
      this.notifyError(`Message : ${err.Message} | Error : ${err.Error}`);
    })
  }

}
