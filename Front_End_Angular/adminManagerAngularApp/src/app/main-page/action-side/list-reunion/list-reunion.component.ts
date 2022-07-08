import { saveAs } from 'file-saver';
import { FileService } from './../../../fileEntity/file.service';
import { AddFileComponent } from './../../pop-ups/add-file/add-file.component';
import { scheduled } from 'rxjs';
import { ReunionService } from './../../../reunion/reunion.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { Reunion } from 'src/app/reunion/Reunion';
import { MatTableDataSource } from '@angular/material/table';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faBan, faCalendarDay, faCheckSquare, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faXingSquare } from '@fortawesome/free-brands-svg-icons';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-reunion',
  templateUrl: './list-reunion.component.html',
  styleUrls: ['./list-reunion.component.css']
})
export class ListReunionComponent implements OnInit {

  reunions: Reunion[];
  dataSource;
  displayedColumns: string[] = ['index', 'date' , 'heure' , 'nombre_invites' , 'etat' , 'action'];
  view: string = 'list';
  faClock = faClock;
  faCalendar = faCalendarDay;
  faEdit = faPenSquare;
  faSave = faCheckSquare;
  faCancel = faBan;
  today;
  selectedReunion: Reunion;
  File;
  defaultTime = [2,0,2];
  states = ['Prévue' , 'Achevé' , 'Annulé'];
  blob;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private toastr: ToastrService , private reunionService: ReunionService , public dialog: MatDialog , private fileService: FileService) { }

  ngOnInit(): void {
    let t = new Date();
    t.setDate(t.getDate()+1);
    this.today = t.toISOString().slice(0,10);
    this.getReunions();
    this.convertDate(new Date());
  }

  getReunions(){
    this.reunionService.getAll().subscribe(res => {
      this.reunions = res;
      this.dataSource = new MatTableDataSource(this.createDataSource(this.reunions));
    } , err => {
      this.notifyError(err.message);
    })
  }

  createDataSource(b: Reunion[]){
    let ret = new Array();
    let i = 0;
    b.forEach(e => {
      console.log(e);
      let full_date: Date = new Date(e.scheduled_date);
      let date = this.convertDate(full_date);
      let heure = this.convertTime(full_date);
      let invited_suffix = ' Invité';
      if(e.reunion_invited.length > 1){
        invited_suffix = ' Invités'
      }

      let time = {
        'edit_mode': false, 'show_buttons': false , 'valid_edit': false , 'aux_hour': full_date.getHours().toString() , 'aux_minute': full_date.getMinutes().toString()
      }

      let color;
      if(e.state == 'Prévue'){
        color = 'prevu';
      }else if(e.state == 'Annulé'){
        color = 'annuler';
      }else{
        color = 'acheve';
      }
      console.log(color);
      let state = {
        'edit_mode': false , 'color': color
      }
      ret.push({'index':i ,'date': date , 'heure': heure , 'mombre_invites': e.reunion_invited.length+invited_suffix , 'etat': e.state , 'entity': e , 'edit_mode': false , 'show_buttons': false , 'valid_edit': false , 'aux_date': null , 'time': time , 'state': state});
      i++;
    });
    return ret;
  }

  convertDate(date: Date){
    let day = date.getDay();
    let day_of_month = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    
    let week_days = {
      0: 'Lun',
      1: 'Mar',
      2: 'Mer',
      3: 'Jeu',
      4: 'Ven',
      5: 'Sam',
      6: 'Dim'
    }

    let month_names = {
      0: 'Janv',
      1: 'Févr',
      2: 'Mars',
      3: 'Avril',
      4: 'Mai',
      5: 'Juin',
      6: 'Juil',
      7: 'Août',
      8: 'Sept',
      9: 'Oct',
      10: 'Nov',
      11: 'Déc'
    }

    return `${week_days[day]} ${day_of_month} ${month_names[month]} ${year}`;
  }

  convertTime(date: Date){
    let heure = date.getHours();
    let minute = date.getMinutes();
    let finalHeure , finalMinute;
    if(heure < 10){
      finalHeure = `0${heure}`;
    }else{
      finalHeure = heure;
    }
    if(minute < 10){
      finalMinute = `0${minute}`;
    }else{
      finalMinute = minute;
    }
    return finalHeure+':'+finalMinute;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  enterEditModeDate(index){
    console.log(this.dataSource);
    this.dataSource.filteredData.forEach(element => {
      element.edit_mode = false;
    });
    this.dataSource.filteredData[index].edit_mode = true;
  }

  exitEditModeDate(index){
    this.dataSource.filteredData[index].edit_mode = false;
  }

  mouseEnterDate(index){
    this.dataSource.filteredData[index].show_buttons = true;
  }

  mouseQuitDate(index){
    this.dataSource.filteredData[index].show_buttons = false;
  }

  checkDate(index){

    let date = new Date(this.dataSource.filteredData[index].aux_date);
    alert(this.dataSource.filteredData[index].aux_date);
  }

  newDate(event , index , tooltip: MatTooltip){
    console.log(event.target.value);
    this.dataSource.filteredData[index].aux_date = event.target.value;
    let date = new Date(this.dataSource.filteredData[index].aux_date);
    let old_date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
    date.setHours(old_date.getHours());
    date.setMinutes(old_date.getMinutes());
    console.log(date);
    if(this.dataSource.filteredData[index].aux_date == ""){
      this.dataSource.filteredData[index].valid_edit = false;
    }else{
      this.reunionService.checkDate(date.getTime() , this.dataSource.filteredData[index].entity.id).subscribe(res => {
        if(res){
          this.dataSource.filteredData[index].valid_edit = true;
          tooltip.hide();
          tooltip.disabled = true;
        }else{
          this.dataSource.filteredData[index].valid_edit = false;
          tooltip.disabled = false;
          tooltip.message = `Une réunion existe en ce moment : \n${this.convertDate(date)} ${this.convertTime(date)}.`;
          tooltip.show();
        }
      })
    }
  }

  changeDate(index){
    if(this.dataSource.filteredData[index].valid_edit && this.dataSource.filteredData[index].aux_date != null && this.dataSource.filteredData[index].aux_date != ""){
      let date = new Date(this.dataSource.filteredData[index].aux_date);
      let old_date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
      date.setHours(old_date.getHours());
      date.setMinutes(old_date.getMinutes());
      let reunion : Reunion = this.dataSource.filteredData[index].entity;
      reunion.scheduled_date = date.toISOString();
      this.reunionService.update(reunion).subscribe(res => {
        this.notifySuccess("Date mise à jour !");
        this.getReunions();
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      
    }
  }

  enterEditModeTime(index){
    this.dataSource.filteredData.forEach(element => {
      element.time.edit_mode = false;
    });
    this.dataSource.filteredData[index].time.edit_mode = true;

  }

  exitEditModeTime(index){
    this.dataSource.filteredData[index].time.edit_mode = false;
  }

  changeTime(index){
    let new_hour = this.dataSource.filteredData[index].time.aux_hour;
    let new_minute = this.dataSource.filteredData[index].time.aux_minute;
    console.log(new_hour);
    console.log(new_minute);
    console.log(this.dataSource.filteredData[index].time.valid_edit)
    if(new_hour != null && new_hour != '' && new_minute != null && new_minute != '' && this.dataSource.filteredData[index].time.valid_edit){
      let date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
      date.setHours(new_hour);
      date.setMinutes(new_minute);
      let reunion : Reunion = this.dataSource.filteredData[index].entity;
      reunion.scheduled_date = date.toISOString();
      this.reunionService.update(reunion).subscribe(res => {
        this.notifySuccess("Date mise à jour !");
        this.getReunions();
      } , err => {
        this.notifyError(err.message);
      })
    }
  }

  mouseEnterTime(index){
    this.dataSource.filteredData[index].time.show_buttons = true;
  }

  mouseQuitTime(index){
    this.dataSource.filteredData[index].time.show_buttons = false;
    
  }

  getTimeArray(time: string): number[]{
    let hour = time.substring(0,2);
    let minute = time.slice(3,5);
  console.log([Number(hour) , Number(minute) , 0]); 
    return [Number(hour) , Number(minute) , 0];
  }

  newHour(event , index){
    this.dataSource.filteredData[index].time.aux_hour = event.target.value;
    let date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
    date.setHours(event.target.value);
    if(this.dataSource.filteredData[index].time.aux_minute != null || this.dataSource.filteredData[index].time.aux_minute != ''){
      date.setMinutes(this.dataSource.filteredData[index].time.aux_minute);
    }
    if(date.getTime() < Date.now()){
      this.dataSource.filteredData[index].time.valid_edit = false;
      this.notifyError("Impossible de planifier une réunion dans le passé !");
    }else{
      this.reunionService.checkDate(date.getTime() , this.dataSource.filteredData[index].entity.id).subscribe(res => {
        if(res){
          this.dataSource.filteredData[index].time.valid_edit = true;
        }else{
          this.dataSource.filteredData[index].time.valid_edit = false;

        }
      })
    }
    
  }

  newMinute(event , index){
    this.dataSource.filteredData[index].time.aux_minute = event.target.value;
    let date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
    date.setMinutes(event.target.value);
    if(this.dataSource.filteredData[index].time.aux_hour != null || this.dataSource.filteredData[index].time.aux_hour != ''){
      date.setHours(this.dataSource.filteredData[index].time.aux_hour);
    }
    if(date.getTime() < Date.now()){
      this.dataSource.filteredData[index].time.valid_edit = false;
      this.notifyError("Impossible de planifier une réunion dans le passé !");
    }else{
      this.reunionService.checkDate(date.getTime() , this.dataSource.filteredData[index].entity.id).subscribe(res => {
        if(res){
          this.dataSource.filteredData[index].time.valid_edit = true;

        }else{
          this.dataSource.filteredData[index].time.valid_edit = false;
  
        }
      })
    }
    
  }

  defaultHour(index){
    let date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
    return date.getHours();
  }

  defaultMinute(index){
    let date = new Date(this.dataSource.filteredData[index].entity.scheduled_date);
    return date.getMinutes();
  }

  onMouseEnterState(index){
    this.dataSource.filteredData[index].state.edit_mode = true;
  }

  onMouseQuitState(index){
    this.dataSource.filteredData[index].state.edit_mode = false;
  }

  changeState(event , index){
    let reunion:Reunion = this.dataSource.filteredData[index].entity;
    reunion.state = event.target.value;
    this.reunionService.updateState(reunion).subscribe(res => {
      this.notifySuccess("État changé avec succès !");
    } , err => {
      this.notifyError(err.message);
    })
  }

  delete(reunion: Reunion){
    this.reunionService.delete(reunion).subscribe(res => {
      this.notifySuccess("Réunion supprimée avec succès !");
      this.getReunions();
    } , err => {
      this.notifyError(err.message);
    })
  }

  openUploadPVDialog(reunion: Reunion){
    const dialogRef = this.dialog.open(AddFileComponent , {
      width: '500px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res === false){

      }else{
        this.reunionService.updatePV(reunion , res.id).subscribe(res => {
          this.getReunions();
        } , err => {
          this.notifyError(err.message);
        })
      }
    })
  }

  download(id: number){
    this.fileService.downloadFile(id).subscribe(res => {
      this.blob = res;
      this.getFile(id);
    } , err => {
      console.log(err);
    })
  }

  getFile(id){
    this.fileService.getFile(id).subscribe(res => {
      this.File = res;
      saveAs(this.blob , this.File.name);
      
    } , err => {
      // Error
    })
  }

  changeView(reunion: Reunion){
    this.selectedReunion = reunion;
    this.view = 'details';
  }

  recieveMessage($event){
    this.getReunions();
    this.view = $event;
  }
}
