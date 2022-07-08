import { SerialNumberService } from './../../serialNumber/serial-number.service';
import { ApproService } from 'src/app/appro/appro.service';
import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/material/Material';
import { MaterialService } from 'src/app/material/material.service';
import { Appro } from 'src/app/appro/Appro';
import { SerialNumber } from 'src/app/serialNumber/SerialNumber';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-collab-material',
  templateUrl: './collab-material.component.html',
  styleUrls: ['./collab-material.component.css']
})
export class CollabMaterialComponent implements OnInit {


  materials: Material[];
  appros: Appro[];
  serialNumbers: SerialNumber[];
  parsedMaterial;
  dataSource;
  displayedColumns = ['category' , 'nom' , 'serialNumber'];
  user_id: any;
  public pageSize = 7;
  public currentPage = 0;
  public totalSize = 0;
  constructor(private materialService: MaterialService , private approService: ApproService , private serialNumberService: SerialNumberService) { }

  ngOnInit(): void {
    this.user_id = JSON.parse(localStorage.getItem("LoggedUser")).id;
    this.getMaterial();
    this.getAppros();
    this.getSerialNumbers();
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
      this.dataSource = new MatTableDataSource<any>(this.parsedMaterial);
      this.iterator()
    } , err => {
      console.log(err);
    })
    
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    this.totalSize = new MatTableDataSource<any>(this.parsedMaterial).data.length;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = new MatTableDataSource<any>(this.parsedMaterial).data.slice(start, end);
    console.log(start);
    console.log(end);
    this.dataSource = new MatTableDataSource<any>(part);
  }

  buildMaterialDataSource(){
    let data = new Array();
    this.serialNumbers.forEach(s => {
      if(s.appointed)
      if(s.user.id == this.user_id){
        let appro = this.findAppro(s.appro.id);
        let material = appro.material;
        console.log(material);
        data.push({
          'category': material.type.name,
          'nom': material.name,
          'serialNumber': s.number,
          
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
