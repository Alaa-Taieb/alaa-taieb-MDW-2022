import { AffecterPopupComponent } from './../../../pop-up/affecter-popup/affecter-popup.component';
import { forkJoin, Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from './../../../user/user.service';
import { SerialNumber } from './../../../serialNumber/SerialNumber';
import { SerialNumberService } from './../../../serialNumber/serial-number.service';

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Material } from 'src/app/material/Material';
import { MaterialService } from 'src/app/material/material.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; 
import { ApproService } from 'src/app/appro/appro.service';
import { Appro } from 'src/app/appro/Appro';
import { User } from 'src/app/user/User';
import { ConfirmationPopupComponent } from 'src/app/pop-up/confirmation-popup/confirmation-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit {

  
  observables = [];
  searchIcon = faSearch;
  searchText:any;
  serialNumbers: SerialNumber[];
  totalQte;
  totalAppro: Appro[];
  finalSerialNumbers;
  selected = new Array();
  @Output() view = new EventEmitter();
  @Input() material_id;
  material: Material;
  checkboxes;
  dialogRef: MatDialogRef<ConfirmationPopupComponent>;
  assignDialog: MatDialogRef<AffecterPopupComponent>;
  anyCheckbox = false;
  displayedColumns: string[] = ['date', 'moyen', 'qte'];
  
  constructor(private toastr: ToastrService , public dialog: MatDialog , private materialService: MaterialService , private ApproService: ApproService , private serialNumberService : SerialNumberService , private userService: UserService) {
  }

  ngOnInit(): void {
    this.getMaterial(this.material_id);
  }

  changeView(view){
    let event = {view: view , back: 'details'}
    this.view.emit(event);
  }

  getMaterial(id){
    this.materialService.getMaterial(id).subscribe(res =>{
      this.material = res;
      this.getAllAppro();
      
      
      
    } , err=>{
      this.toastr.error(`${err}`, 'Error' , {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        newestOnTop: false,
        closeButton: true
      });
    })
  }

  initSerialNumbers(sn: SerialNumber[]){
    
    sn.forEach(element => {
      if(element.appointed){
        this.userService.getUser(element.user.id).subscribe(res => {
          let finalSN = {
            id: element.id,
            number: element.number,
            held: res.login,
            appointed: element.appointed
          }
          this.finalSerialNumbers.push(finalSN);
        })
      }else{
        let finalSN = {
          id: element.id,
          number: element.number,
          held: "Stock",
          appointed: element.appointed
        };
        this.finalSerialNumbers.push(finalSN);
        
      }
     
    });

  }

  getAllAppro(){
    this.ApproService.findByMaterial(this.material).subscribe(res=>{
      this.totalAppro = res;
      this.qteSum();
      this.getSerialNumber();
    } , err=>{
      this.toastr.error(`${err}`, 'Error' , {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        newestOnTop: false,
        closeButton: true
      });
    }) 
  }

  qteSum(){
    this.totalQte = 0;
    this.totalAppro.forEach(element => {
      this.totalQte += element.qte;
    });
  }

  getSerialNumber(){
    
    let sns = new Array();
    this.finalSerialNumbers = new Array();
    let Observables = [];
    this.totalAppro.forEach(element =>{
      Observables.push(this.serialNumberService.getSerialNumbersByAppro(element));
    });
    forkJoin(Observables).subscribe(res => {
      res.forEach(serialNumber => {
        serialNumber.forEach(sn => {
          sns.push(sn);
        })
        
      });
      this.serialNumbers = sns;
      this.initSerialNumbers(sns);
      this.createCheckboxes();
    } , err => {
      this.toastr.error(`${err}`, 'Error' , {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        newestOnTop: false,
        closeButton: true
      });
    })
  }

  openConfirmationDialog() {
    this.dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"
    this.dialogRef.componentInstance.title = "Suppression"
    this.dialogRef.componentInstance.moreInfo = this.prepareMoreInfo();
    this.dialogRef.afterClosed().subscribe(result => {
      
      if(result) {
        // do confirmation actions
        this.observables = new Array();
        this.selected.forEach(s => {
          
          this.observables.push(this.deleteSerialNumber(s.id));
          
        })

        
        forkJoin(this.observables).subscribe(res => {
          
          this.fixTotalQte();
          this.toastr.success(`${this.selected.length} items deleted!`, 'Success' , {
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            newestOnTop: false,
            closeButton: true
          });
        })
        
      }
      this.dialogRef = null;
    });
  }

  createCheckboxes(){
    this.checkboxes = new Array(this.finalSerialNumbers.length);
    for(let i = 0 ; i < this.checkboxes.length ; i++){
      this.checkboxes[i] = false;
    }
  }

  showCheckboxes(){
    console.log(this.checkboxes);
  }

  select(id){
    let serialNumber = this.findSerialNumberById(id);
    this.checkAnyCheckbox();
    if(!this.selected.includes(serialNumber)){
      this.selected.push(serialNumber);
    }else{
      delete this.selected[(this.selected.indexOf(serialNumber))];
    }
  }
  
  findSerialNumberById(id){
    let serialNumber;
    this.finalSerialNumbers.forEach(sn =>{
      if(sn.id == id){
        serialNumber = sn;
      }
    });
    return serialNumber;
  }

  prepareMoreInfo(){
    let ret = '';
    ret += "<ul>";
    this.selected.forEach(s =>{
      ret += "<li>";
      ret += "<span class='float-left'>"+ s.number + "</span>";
      ret += "<span class='float-right'>"+ s.held + "</span>";
      ret += "</li>";
    })
    ret += "</ul>";
    return ret;
  }

  checkAnyCheckbox(){
    this.anyCheckbox = false;
    this.checkboxes.forEach(c =>{
      if(c == true) this.anyCheckbox = true;
    })
  }

  deleteSerialNumber(id){
    return this.serialNumberService.deleteSerialNumber(id);
  }

  calculateNewQteForAppro(appro: Appro){
    let qte = appro.qte - this.selected.length;
    this.selected = new Array();
    console.log("QTE: " + qte);
    return qte;
  }

  updateApproQte(appro: Appro , qte: number){
    console.log(appro);
    appro.qte = qte;
    return this.ApproService.updateAppro(appro);
  }

  fixTotalQte(){
    let Observables = new Array();
    this.totalAppro.forEach(a => {
      Observables.push(this.updateApproQte(a , this.calculateNewQteForAppro(a)));
    });
    forkJoin(Observables).subscribe(res => {
      this.getMaterial(this.material_id);
    })
  }

  assignItem(id: number){
    let serialNumber: SerialNumber;
    this.serialNumbers.forEach(sn => {
      if(sn.id == id){
        serialNumber = sn;
      }
    })
    this.assignDialog = this.dialog.open(AffecterPopupComponent, {
      panelClass: 'custom-dialog-container',
      disableClose: true,
      width: '500px',
      height: '400px'
    });
    this.assignDialog.componentInstance.serialNumber = serialNumber;
    this.assignDialog.afterClosed().subscribe(result => {
      if(result){
        this.getMaterial(this.material_id);
      }else{
        this.toastr.info(`Operation aborted`, 'Canceled' , {
          timeOut: 5000,
          positionClass: 'toast-bottom-right',
          newestOnTop: false,
          closeButton: true
        });
      }
    });
  }

  
  

  


  



  

}
