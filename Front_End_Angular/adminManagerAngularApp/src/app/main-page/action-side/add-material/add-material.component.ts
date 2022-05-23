import { Observable } from 'rxjs';
import { Appro } from './../../../appro/Appro';
import { MoyenApproService } from './../../../moyenAppro/moyen-appro.service';
import { SerialNumberService } from './../../../serialNumber/serial-number.service';
import { ApproService } from './../../../appro/appro.service';
import { TypeMaterial } from './../../../type-material/TypeMaterial';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { TypeMaterialService } from './../../../type-material/type-material.service';
import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/role/Role';
import { RoleService } from 'src/app/role/role.service';
import { User } from 'src/app/user/User';
import { UserService } from 'src/app/user/user.service';
import { MaterialService } from 'src/app/material/material.service';
import { MoyenAppro } from 'src/app/moyenAppro/MoyenAppro';
import { SerialNumber } from 'src/app/serialNumber/SerialNumber';
import { Material } from 'src/app/material/Material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent implements OnInit {

  faPlus = faPlusSquare;

  showNewType = false;
  newType;

  showNewMoy = false;
  newMoy;

  material;
  name;
  date_acq;
  moyen_id;
  state;
  type_id;
  
  qte: number;
  show_serialN = false;
  
  appro: Appro;

  serial_number;
  types: TypeMaterial[];
  moys: MoyenAppro[];
  moyen: MoyenAppro;

  constructor(private toastr: ToastrService , private moyenApproService: MoyenApproService , private materialService:MaterialService , private typeMaterialService: TypeMaterialService , private approService: ApproService , private serialNumberSerivce: SerialNumberService) { }

  ngOnInit(): void {
    this.qte = 1;
    this.serial_number = [{value: ''}]; 
    this.getTypes();
    this.getMoy();
    
  }

  createArray(){

    if(this.qte > this.serial_number.length){
      this.serial_number.push({value: ''});
    }

    if(this.qte < this.serial_number.length){
      this.serial_number.pop();
    }

  }

  showSN(){
    for(let i = 0 ; i < this.serial_number.length ; i++){
      console.log(this.serial_number[i].value);
    }
  }

  getMoyen(id: number){
    let ret: MoyenAppro;
    this.moys.forEach(m => {
      if(m.id == id){
        ret = m;
      }
    })
    return ret;
  }

  parseSerialNumbers(serial_numbers){
    let ret = '';
    serial_numbers.forEach(element => {
      ret = ret.concat(element.value);
      ret = ret.concat(',');
    });
    ret = ret.slice(0,ret.length-1);
    return ret;
  }

  createAppro(){
    let appro: Appro;
    console.log("Before creating Appro : " , this.material);
    console.log(this.show_serialN);
    let moyen: MoyenAppro;
    moyen = this.getMoyen(this.moyen_id);
    appro = {
      date: this.date_acq,
      hasSerialNumber: this.show_serialN,
      material: this.material,
      moyen: moyen,
      qte: this.qte
    }
    this.appro = appro;
    this.approService.addAppro(appro).subscribe(res => {
      console.log("Appro added successfully");
      console.log("Message : " , res);
      this.appro = res;
      if(this.show_serialN){
        this.createSerialNumbers();
      }
    } , err=>{
      console.log("An error Occured.");
      console.log("Error : " , err);
    })
  }

  createMaterial(type: TypeMaterial){
    let material: Material;
    material = {
      name: this.name,
      type: type
    }
    
    this.material = material;

    this.materialService.addMaterial(material).subscribe(res => {
      this.material = res;
      this.createAppro();
      console.log("Material Added Successfully!");

    } , err => {
      console.log("An error has occured!");
      console.log("Error : " , err);
    })

    console.log("After creating Material : " , this.material);

    
  }

  createSerialNumbers(){
    this.serial_number.forEach(element => {
      let serialNumber: SerialNumber;
      serialNumber = {
        appointed: false,
        appro: this.appro,
        number: element.value,
        
      }
      
      this.serialNumberSerivce.addSerialNumber(serialNumber).subscribe(res => {
        console.log("Serial Number Added : " , element.value);
        this.notifySuccess();
      } , err=> {
        console.log("Error Occured!");
        console.log("Error : " , err);
      })
    });
  }

  notifySuccess(){
    this.toastr.success(`Operation performed successfully!`, 'Success' , {
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false,
      closeButton: true
    });
  }

  addMaterials(){
    let realType;
    if(this.showNewType){
      let type = {name: this.newType}
      this.typeMaterialService.addType(type).subscribe(res =>  {
        console.log("Type Ajouter Avec Success!");
        realType = res;
        this.createMaterial(realType);
        
      })
    }else{
      for(let i = 0 ; i < this.types.length ; i++){
        if(this.type_id == this.types[i].id){
          realType = this.types[i];
          break;
        }
      }
        this.createMaterial(realType);
        
        
      }
    
    
    
  }

  switchNewType(){
    this.showNewType = !this.showNewType;
  }

  switchNewMoy(){
    this.showNewMoy = !this.showNewMoy;
  }

  getTypes(){
    this.typeMaterialService.getTypes().subscribe(res => {
      this.types = res;
    })
  }

  getMoy(){
    this.moyenApproService.getAllMoyen().subscribe(res => {
      this.moys = res;
    })
  }


  
}
