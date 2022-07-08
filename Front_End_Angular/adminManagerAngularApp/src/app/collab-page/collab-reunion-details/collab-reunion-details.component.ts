import { faCircle as faCircleSolid } from '@fortawesome/free-solid-svg-icons';
import { Reunion } from 'src/app/reunion/Reunion';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/user/User';
import { MatTableDataSource } from '@angular/material/table';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-collab-reunion-details',
  templateUrl: './collab-reunion-details.component.html',
  styleUrls: ['./collab-reunion-details.component.css']
})
export class CollabReunionDetailsComponent implements OnInit {

  @Input() reunion: Reunion;
  user_id;
  dataSource;
  invitedUsers: User[];
  assistedUsers: User[];
  parsedUsers;
  displayedColumns = ['username' , 'email' , 'role' , 'assisted'];
  assistedIcon = faCircleSolid;
  nonAssistedIcon = faCircle
  public pageSize = 3;
  public currentPage = 0;
  public totalSize = 0;
  @Output() view = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem("LoggedUser")).id;
    console.log(this.reunion);
    this.invitedUsers = this.reunion.reunion_invited;
    this.assistedUsers = this.reunion.reunion_assisted;
    this.parsedUsers = this.buildDataSource();
    this.dataSource = new MatTableDataSource<any>(this.parsedUsers);
    this.iterator();
  }

  buildDataSource(){
    let data = new Array();
    this.invitedUsers.forEach(user => {
      let assisted = false;
      if(this.findUserInAssisted(user.id)){
        assisted = true;
      }
      data.push({'username' : user.login , 'email': user.email , 'role': user.role.name , 'assisted': assisted , 'entity': user});
    })
    return data;
  }

  findUserInAssisted(id: number){
    let ret = false;
    this.assistedUsers.forEach(user => {
      if(user.id == id){
        ret = true;
      }
    });
    return ret;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.totalSize = new MatTableDataSource<any>(this.parsedUsers).data.length;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = new MatTableDataSource<any>(this.parsedUsers).data.slice(start, end);
    console.log(start);
    console.log(end);
    this.dataSource = new MatTableDataSource<any>(part);
  }

  sendMessage(){
    this.view.emit('list');
  }
}
