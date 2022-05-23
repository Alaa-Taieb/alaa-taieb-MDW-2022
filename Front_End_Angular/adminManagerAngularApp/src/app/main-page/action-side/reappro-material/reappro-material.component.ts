import { forkJoin } from 'rxjs';
import { MoyenApproService } from './../../../moyenAppro/moyen-appro.service';
import { SerialNumberService } from './../../../serialNumber/serial-number.service';
import { ApproService } from 'src/app/appro/appro.service';
import { MoyenAppro } from './../../../moyenAppro/MoyenAppro';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialService } from 'src/app/material/material.service';
import { Material } from 'src/app/material/Material';
import { ToastrService } from 'ngx-toastr';
import { Appro } from 'src/app/appro/Appro';
import { SerialNumber } from 'src/app/serialNumber/SerialNumber';

@Component({
  selector: 'app-reappro-material',
  templateUrl: './reappro-material.component.html',
  styleUrls: ['./reappro-material.component.css']
})
export class ReapproMaterialComponent implements OnInit {

  @Output() view = new EventEmitter(); 
  @Input() material_id: number;
  @Input() back: string;
  material: Material;
  qte: number;
  show_serialN: boolean;
  moyen_id: number;
  appro: Appro;
  showNewMoy: boolean;
  faPlus = faPlusSquare;
  moys: MoyenAppro[];
  newMoy: string;
  date_acq: string;
  serial_number;
  moyen: MoyenAppro;
  finalMoyen: MoyenAppro;
  constructor(private toastr: ToastrService , private materialService: MaterialService , private approService: ApproService , private serialNumberService: SerialNumberService , private moyenApproService: MoyenApproService) { }

  ngOnInit(): void {
    this.qte = 1;
    this.serial_number = [{value: ''}]; 
    this.getMaterial();
  }

  createSerialNumbers(){
    let observables = new Array();
    console.log(this.serial_number);
    this.serial_number.forEach(element => {
      let serialNumber: SerialNumber;
      serialNumber = {
        appointed: false,
        appro: this.appro,
        number: element.value,
      }
      observables.push(this.serialNumberService.addSerialNumber(serialNumber));
    })
    forkJoin(observables).subscribe(res => {
      this.notifySuccess('Serial Numbers saved!');
    } , err => {
      this.notifyError('Failed to save serial numbers!');
    })
  }

  createMoyen(){
    let moyen: MoyenAppro = {name: this.newMoy}
    this.moyenApproService.addMoyen(moyen).subscribe(res => {
      this.finalMoyen = res;
      this.createAppro(this.finalMoyen).subscribe(res => {
        this.appro = res;
        this.notifySuccess('Appro Created Successfully!');
        this.createSerialNumbers();
      } , err => {
        console.log(err);
        this.notifyError(err);
      })
      
    } , err => {
      this.notifyError(err);
    })
  }

  execute(){
    let observables = new Array();
    if(this.showNewMoy){
      this.createMoyen();
    }else{
      this.createAppro(this.findMoyById(this.moyen_id)).subscribe(res => {
        this.appro = res;
        this.notifySuccess('Appro Created Successfully!');
        this.createSerialNumbers();
      } , err => {
        console.log(err);
        this.notifyError(err);
      })
    }
    this.switchView();
    
  }

  createAppro(moyen: MoyenAppro){
    
    if(this.showNewMoy){
      let appro: Appro = {
        date: this.date_acq , 
        moyen: moyen,
        material: this.material,
        qte: this.qte,
        hasSerialNumber: this.show_serialN
      }
      return this.approService.addAppro(appro);
    }else{
      let appro: Appro = {
        date: this.date_acq , 
        moyen: moyen,
        material: this.material,
        qte: this.qte,
        hasSerialNumber: this.show_serialN
      }
      return this.approService.addAppro(appro);
    }
  }

  findMoyById(id: number){
    let ret: MoyenAppro;
    this.moys.forEach(m => {
      if(m.id == id){
        ret = m;
      }
    });
    return ret;
  }

  switchNewMoy(){
    this.showNewMoy = !this.showNewMoy;
  }

  createArray(){

    if(this.qte > this.serial_number.length){
      this.serial_number.push({value: ''});
    }

    if(this.qte < this.serial_number.length){
      this.serial_number.pop();
    }

  }

  getMaterial(){
    this.materialService.getMaterial(this.material_id).subscribe(res => {
      this.material = res;
      this.getMoys();
    } , err=> {
      this.notifyError(err.Message);
    })
  }

  getMoys(){
    this.moyenApproService.getAllMoyen().subscribe(res => {
      this.moys = res;
    } , err => {
      this.notifyError(err.Message);
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

  switchView(){
    let event = {view: 'details' , back:'list'};
    this.view.emit(event);

  }
}
