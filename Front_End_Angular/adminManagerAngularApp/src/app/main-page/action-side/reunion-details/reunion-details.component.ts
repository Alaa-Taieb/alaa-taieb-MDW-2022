import { ReunionService } from './../../../reunion/reunion.service';
import { Reunion } from 'src/app/reunion/Reunion';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ThemePalette } from '@angular/material/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/user/User';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reunion-details',
  templateUrl: './reunion-details.component.html',
  styleUrls: ['./reunion-details.component.css']
})
export class ReunionDetailsComponent implements OnInit {

  @Input() reunion: Reunion;
  @Output() view = new EventEmitter();
  invalidMessage: string;
  users: User[];
  parsedUsers;
  validDate: boolean = true;
  scheduled_date:string;
  sujet: string;
  dataSource;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select' ,'username', 'role'];
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
  constructor(private toastr: ToastrService , private reunionService: ReunionService) { }

  ngOnInit(): void {
    this.scheduled_date = this.reunion.scheduled_date;
    this.sujet = this.reunion.sujet;
    this.loadUsers();
    console.log(this.reunion);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUsers(){
    this.users = this.reunion.reunion_invited;
    this.parsedUsers = this.buildDataSource();
    this.dataSource = new MatTableDataSource<Document>(this.parsedUsers);
    

    this.reunion.reunion_assisted.forEach(assisted => {
      this.dataSource.data.forEach(row => {
        console.log("Data : " + row.entity.id);
        console.log("Assisted : " + assisted.id);
        if(row.entity.id == assisted.id){
          this.selection.select(row);
          console.log(row);
        }
      });
    })
  }

  buildDataSource(){
    let ret = new Array();
    this.users.forEach(d => {
      ret.push({'select' : null , 'username': d.login , 'role': d.role.name , 'entity': d});
    });
    return ret;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row)

        });
    this.sendAssistedList();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  cancel(){

  }

  execute(){
    this.reunion.sujet = this.sujet;
    this.reunion.scheduled_date = new Date(this.scheduled_date).toISOString();
    console.log(new Date(this.scheduled_date));

    this.reunionService.update(this.reunion).subscribe(res => {
      this.notifySuccess("La réunion est mise à jour avec succès.");
    } , err => {
      this.notifyError(err.message);
    })
  }

  checkDate(){
    console.log(this.scheduled_date);
    let date = new Date(this.scheduled_date);
    console.log(date.toISOString().substring(0,19));
    date.setHours(date.getHours());
    console.log(date.toISOString().substring(0,19));
    if(date.getTime() > Date.now()){
      this.reunionService.checkDate(date.getTime() , this.reunion.id).subscribe(res => {
        this.validDate = res;
        if(res == false){
          this.invalidMessage = "L'heure choisie est à moins de deux heures d'une autre réunion, veuillez reporter la réunion."
        }
      })
    }else{
      this.validDate = false;
      this.invalidMessage = "La date choisie est déjà passée, veuillez en choisir une autre."
    }
    
  }

  selectRow($event , row){
    $event ? this.selection.toggle(row) : null;
    this.sendAssistedList();
  }

  sendAssistedList(){
    console.log(this.selection.selected);
    let assistes: User[] = new Array();
    this.selection.selected.forEach(s => {
      assistes.push(s.entity);
    })
    this.reunion.reunion_assisted = assistes;
    console.log(this.reunion);
    this.reunionService.updateAssistes(this.reunion).subscribe(res => {
      this.notifySuccess("Liste des utilisateurs assistés mise à jour !");
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

  backToList(){
    this.view.emit('list');
  }

}
