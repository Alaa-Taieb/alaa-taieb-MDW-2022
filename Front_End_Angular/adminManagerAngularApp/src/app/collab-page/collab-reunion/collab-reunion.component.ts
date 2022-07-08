import { saveAs } from 'file-saver';
import { FileService } from './../../fileEntity/file.service';
import { ReunionService } from './../../reunion/reunion.service';
import { Component, OnInit } from '@angular/core';
import { Reunion } from 'src/app/reunion/Reunion';
import { MatTableDataSource } from '@angular/material/table';
import { FileEntity } from 'src/app/fileEntity/FileEntity';

@Component({
  selector: 'app-collab-reunion',
  templateUrl: './collab-reunion.component.html',
  styleUrls: ['./collab-reunion.component.css']
})
export class CollabReunionComponent implements OnInit {

  reunions: Reunion[];
  parsedReunions;
  user_id;
  dataSource;
  displayedColumns = ['creation_date' , 'scheduled_date' , 'hour' , 'state' , 'action'];
  public pageSize = 7;
  public currentPage = 0;
  public totalSize = 0;
  view: string = 'list';
  blob: any;
  File: FileEntity;
  selectedReunion: Reunion;

  constructor(private reunionService: ReunionService , private fileService:FileService) { }

  ngOnInit(): void {
    this.view = 'list';
    this.user_id = JSON.parse(localStorage.getItem("LoggedUser")).id;
    this.getReunions();
    
  }

  getReunions(){
    this.reunionService.getAll().subscribe(res => {
      this.reunions = res;
      this.parsedReunions = this.buildDataSource();
      console.log(this.parsedReunions);
      this.dataSource = new MatTableDataSource<any>(this.parsedReunions);
      this.iterator();
    } , err => {
      console.log(err);
    })
  }

  buildDataSource(){
    let data = new Array();
    this.reunions.forEach(r => {
      r.reunion_invited.forEach(invited => {
        if(this.checkIfInvited(invited.id)){
          data.push({
            'creation_date': r.creation_date.slice(0,10),
            'scheduled_date': this.convertDate(new Date(r.scheduled_date)),
            'hour': this.convertTime(new Date(r.scheduled_date)),
            'state': r.state,
            'entity': r
          })
        }
      })
    })
    return data;
  }

  checkIfInvited(id: number){
    console.log("ID : "+ id);
    console.log("user_ID : "+ this.user_id);
    if(id == this.user_id){
      return true;
    }else{
      return false;
    }
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

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.totalSize = new MatTableDataSource<any>(this.parsedReunions).data.length;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = new MatTableDataSource<any>(this.parsedReunions).data.slice(start, end);
    console.log(start);
    console.log(end);
    this.dataSource = new MatTableDataSource<any>(part);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  detailsView(reunion: Reunion){
    this.view = 'details';
    this.selectedReunion = reunion;
  }

  recieveMessage($event){
    this.getReunions();
    this.view = $event;
  }
}
