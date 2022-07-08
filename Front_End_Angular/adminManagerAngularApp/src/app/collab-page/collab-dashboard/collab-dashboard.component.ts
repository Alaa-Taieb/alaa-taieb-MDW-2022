import { SerialNumber } from './../../serialNumber/SerialNumber';
import { SerialNumberService } from './../../serialNumber/serial-number.service';
import { ApproService } from 'src/app/appro/appro.service';
import { ReunionService } from './../../reunion/reunion.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { Reunion } from 'src/app/reunion/Reunion';
import { Material } from 'src/app/material/Material';
import { Appro } from 'src/app/appro/Appro';
import { MaterialService } from 'src/app/material/material.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-collab-dashboard',
  templateUrl: './collab-dashboard.component.html',
  styleUrls: ['./collab-dashboard.component.css']
})



export class CollabDashboardComponent implements OnInit {
 
  reunions : Reunion[];
  material_dataSource;
  material_displayedColumns = ['nom' , 'serialNumber' , 'action'];
  user_id;
  events;
  materials: Material[];
  parsedMaterial;
  appros: Appro[];
  serialNumbers: SerialNumber[];
  public material_pageSize = 3;
  public material_currentPage = 0;
  public material_totalSize = 0;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  constructor(private reunionService: ReunionService , private materialService: MaterialService , private approService:ApproService , private serialNumberService: SerialNumberService) { }

  ngOnInit(): void {
    this.getReunions();
    this.user_id = JSON.parse(localStorage.getItem("LoggedUser")).id;
    this.getMaterial();
    this.getAppros();
    this.getSerialNumbers();
    
  }

  public handlePage(e: any) {
    this.material_currentPage = e.pageIndex;
    this.material_pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.material_totalSize = new MatTableDataSource<any>(this.parsedMaterial).data.length;
    const end = (this.material_currentPage + 1) * this.material_pageSize;
    const start = this.material_currentPage * this.material_pageSize;
    const part = new MatTableDataSource<any>(this.parsedMaterial).data.slice(start, end);
    console.log(start);
    console.log(end);
    this.material_dataSource = new MatTableDataSource<any>(part);
  }

  getMaterial(){
    this.materialService.getMaterials().subscribe(res => {
      this.materials = res;
    } , err => {
      console.log(err);
    })
  }

  getAppros(){
    this.approService.getAppro().subscribe(res => {
      this.appros = res;
    } , err => {
      console.log(err);
    })
  }

  getSerialNumbers(){
    this.serialNumberService.getSerialNumbers().subscribe(res => {
      this.serialNumbers = res;
      this.parsedMaterial = this.buildMaterialDataSource();
      this.material_dataSource = new MatTableDataSource<any>(this.parsedMaterial);
      this.iterator()
    } , err => {
      console.log(err);
    })
    
  }

  getReunions(){
    this.reunionService.getAll().subscribe(res => {
      this.reunions = res;
      this.buildEvents();
    } , err => {
      console.log(err);
    })
  }

  buildMaterialDataSource(){
    let data = new Array();
    this.serialNumbers.forEach(s => {
      if(s.appointed)
      if(s.user.id == this.user_id){
        let appro = this.findAppro(s.appro.id);
        let material = appro.material;
        data.push({
          'nom': material.name,
          'serialNumber': s.number
        })
      }
    })
    console.log(data);
    return data;
  }

  findAppro(id : number){
    let appro: Appro;
    this.appros.forEach(a => {
      if(a.id == id){
        appro = a;
      }
    })
    return appro;
  }

  buildEvents(){
    let events = new Array();
    this.reunions.forEach(r => {
      r.reunion_invited.forEach(user => {
        console.log(user.id == this.user_id)
        if(user.id == this.user_id){
          let hour = new Date(r.scheduled_date).getHours();
          let minute = new Date(r.scheduled_date).getMinutes();
          let date = r.scheduled_date.slice(0,10);
          events.push({title: `à ${hour}:${minute}` , date: date});
        }
      })
    })
    console.log(events);
    this.events = events;
    this.calendarOptions.events = events;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.material_dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.material_dataSource)

    if (this.material_dataSource.paginator) {
      this.material_dataSource.paginator.firstPage();
    }
  }

}
