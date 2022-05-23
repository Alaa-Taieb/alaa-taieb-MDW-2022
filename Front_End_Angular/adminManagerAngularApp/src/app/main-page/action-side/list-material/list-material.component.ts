import { ApproService } from './../../../appro/appro.service';
import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/material/Material';
import { MaterialService } from 'src/app/material/material.service';
import { Appro } from 'src/app/appro/Appro';

@Component({
  selector: 'app-list-material',
  templateUrl: './list-material.component.html',
  styleUrls: ['./list-material.component.css']
})
export class ListMaterialComponent implements OnInit {

  materialList: Material[];
  back = 'list';
  finalMaterialList;
  serial_numbers;
  view = 'list';
  material_id;
  totalAppro;

  constructor(private materialService: MaterialService , private ApproService: ApproService) { }

  ngOnInit(): void {
    this.getMaterials();
    
  }

  getMaterials(){
    this.materialService.getMaterials().subscribe(res => {
      this.materialList = res;
      this.finalList();
    });
  }

  finalList(){
    this.finalMaterialList = new Array();
    this.materialList.forEach(element => {
      let totalAppro: Appro[];
      let totalQte;
      this.ApproService.findByMaterial(element).subscribe(res=>{
        totalAppro = res;
        totalQte = this.qteSum(totalAppro);
        this.finalMaterialList.push({id:element.id , name: element.name , 
          type: element.type.name , 
          
          qte: totalQte});
      })
    })
  }

  recieveMessage($event){
    console.log($event);
   
    this.view = $event.view;
    this.back = $event.back;
    if(this.view == 'list'){
      this.back = 'list';
    }
    this.getMaterials();
  }

  qteSum(totalAppro: Appro[]){
    let qte = 0;
    totalAppro.forEach(element => {
      qte += element.qte;
    });
    return qte
  }

  

  /*getSerialNumbers(name){
    this.serial_numbers = new Array();
    this.materialList.forEach(element => {
      if(name == element.name){
        for(let i = 0 ; i < element.serial_number.length ; i++){
          this.serial_numbers.push({value: element.serial_number[i]});
        }
      }
    });
  }*/

  switchDetailsView(id){
    this.material_id = id;

    this.view = 'details';
  }

  switchUpdateView(id){
    this.material_id = id;

    this.view = 'update';
  }

  



}
