import { Reunion } from './../../../reunion/Reunion';
import { UserService } from './../../../user/user.service';
import { ReunionService } from './../../../reunion/reunion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/user/User';
import { formatDate } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { scheduled } from 'rxjs';

@Component({
  selector: 'app-add-reunion',
  templateUrl: './add-reunion.component.html',
  styleUrls: ['./add-reunion.component.css']
})
export class AddReunionComponent implements OnInit {

  constructor(private toastr: ToastrService , private reunionService: ReunionService , private userService: UserService) { }

  reunion: Reunion;
  users: User[];
  validDate: boolean = true;
  scheduled_date:string;
  sujet: string;
  parsedUsers;
  dataSource;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select' ,'username', 'role'];
  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());
  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.parsedUsers = this.buildDataSource();
      this.dataSource = new MatTableDataSource<Document>(this.parsedUsers);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  buildDataSource(){
    let ret = new Array();
    this.users.forEach(d => {
      ret.push({'select' : null , 'username': d.login , 'role': d.role.name , 'entity': d});
    });
    return ret;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(this.selection.selected);
    return numSelected === numRows;
  }

  checkDate(){
    console.log(this.scheduled_date);
    let date = new Date(this.scheduled_date);
    console.log(date.toISOString().substring(0,19));
    date.setHours(date.getHours());
    console.log(date.toISOString().substring(0,19));
    if(date.getTime() > Date.now()){
      this.reunionService.checkDate(date.getTime() , -1).subscribe(res => {
        this.validDate = res;
      })
    }else{
      this.validDate = false;
    }
    
  }

  cancel(){
    this.selection.clear();
    this.scheduled_date = null;
    this.sujet = null;
  }

  execute(){
    let invites : User[] = new Array();
    this.selection.selected.forEach(u => {
      invites.push(u.entity);
    })
    let reunion: Reunion = {
      
      scheduled_date: new Date(this.scheduled_date).toString(),
      sujet: this.sujet,
      reunion_invited: invites
    }
    this.reunionService.add(reunion).subscribe(res => {
      this.notifySuccess("Réunion planifiée avec succès!");
    } , err => {
      this.notifyError(err.message);
    })
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
}
