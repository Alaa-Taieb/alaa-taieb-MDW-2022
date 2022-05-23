import { Observable } from 'rxjs';

import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { TypeMaterial } from './../../../type-material/TypeMaterial';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialService } from 'src/app/material/material.service';
import { TypeMaterialService } from 'src/app/type-material/type-material.service';
import { ToastrService } from 'ngx-toastr';
import { Material } from 'src/app/material/Material';


@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent implements OnInit {

  @Output() view = new EventEmitter();
  @Input() material_id: number;
  @Input() back: string;
  name: string;
  type_id: number;
  showNewType: boolean;
  types: TypeMaterial[];
  newType: string;
  finalType: TypeMaterial;
  faPlus = faPlusSquare;
  material: Material;

  constructor(private toastr: ToastrService ,private materialService: MaterialService , private typeMaterialService: TypeMaterialService) { }

  ngOnInit(): void {
    this.getTypes();
  }

  switchNewType(){
    this.showNewType = !this.showNewType;
    
  }

  switchView(){
    let event = {view: this.back , back:'list'};
    this.view.emit(event);

  }

  getMaterial(){
    this.materialService.getMaterial(this.material_id).subscribe(res => {
      this.name = res.name;
      this.type_id = res.type.id;
      this.material = res;
    } , err => {
      this.notifyError(err.Message);
    })
  }

  getTypes(){
    this.typeMaterialService.getTypes().subscribe(res => {
      this.types = res;
      this.getMaterial();
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

  execute(){
    let Observables = new Array();
    if(this.showNewType && !this.checkIfNewTypeExists(this.newType)){
      this.createType();
    }else{
      let material = {id: this.material.id , name: this.name , type: this.findTypeById(this.type_id)};
      this.updateMaterial(material);
    }


  }

  updateMaterial(material){
    this.materialService.updateMaterial(material).subscribe(res => {
      this.notifySuccess("Material updated!");
      this.switchView();
    } , err => {
      this.notifyError(err);
    });
  }

  createType(){
    let type = {name: this.newType}
    this.typeMaterialService.addType(type).subscribe(res => {
      this.finalType = res;
      let material = {id: this.material.id , name: this.name , type: this.finalType};
      this.updateMaterial(material);
    })
  }

  checkIfNewTypeExists(name: string){
    let ret = false;
    this.types.forEach(type => {
      if(type.name == name){
        ret = true;
      }
    });
    return ret;
  }

  findTypeById(id: number){
    let ret = undefined;
    this.types.forEach(type => {
      if(id == type.id){
        ret = type;
      }
    });
    return ret;
  }

}
