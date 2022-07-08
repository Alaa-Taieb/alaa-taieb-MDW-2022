import { forkJoin } from 'rxjs';
import { MoyenApproService } from './../../../moyenAppro/moyen-appro.service';
import { DocumentService } from './../../../document/document.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Document } from 'src/app/document/Document';
import { Envoi } from 'src/app/envoi/Envoi';
import { EnvoiService } from 'src/app/envoi/envoi.service';
import { faCircle, faPlusSquare, fas } from '@fortawesome/free-solid-svg-icons';
import {SelectionModel} from '@angular/cdk/collections';
import { MoyenAppro } from 'src/app/moyenAppro/MoyenAppro';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details-envoi',
  templateUrl: './details-envoi.component.html',
  styleUrls: ['./details-envoi.component.css']
})
export class DetailsEnvoiComponent implements OnInit {

  @Input() envoi_id;
  @Output() view = new EventEmitter();
  envoi: Envoi;
  documents: Document[];
  displayedColumns: string[] = ['select' ,'code', 'type' , 'username' , 'date' , 'sent'];
  faPlus = faPlusSquare;
  dataSource;
  selection = new SelectionModel<any>(true, []);
  sentIcon = faCircle;
  moyen: MoyenAppro;
  moyens: MoyenAppro[];
  moyen_id: number;
  newMoyen: MoyenAppro;
  showNewMoyen: boolean;
  date: string;
  removedDocuments: Document[];
  addedDocuments: Document[];

  constructor(private toastr: ToastrService , private envoiService:EnvoiService , private documentService: DocumentService , private moyenService: MoyenApproService) { }

  ngOnInit(): void {
    this.getEnvoi();
  }

  getEnvoi(){
    this.envoiService.getById(this.envoi_id).subscribe(res => {
      this.envoi = res;
      this.getMoyens();
      this.moyen_id = this.envoi.moyen.id;
      this.date = this.envoi.date.slice(0,10);
      this.getDocuments();
      
    } , err => {
      this.notifyError(err.message);
    })
  }

  getMoyens(){
    this.moyenService.getAllMoyen().subscribe(res =>  {
      this.moyens = res;

    } , err => {
      this.notifyError(err.message);
    })
  }

  getDocuments(){
    this.documentService.getAll().subscribe(res => {
      this.documents = res;
      this.removeDocumentsOfOtherEnvoi();
      this.dataSource = this.buildDataSource();
      this.dataSource = new MatTableDataSource<Document>(this.dataSource);
      this.selectAll();
      console.log(this.documents);
      console.log(this.dataSource);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeDocumentsOfOtherEnvoi(){
    let newArray = new Array();
    this.documents.forEach(d => {
      if(d.envoi == undefined){
        newArray.push(d);
      }else if(d.envoi.id == this.envoi_id){
        newArray.push(d);
      }
    });
    this.documents = newArray;
  }

  selectAll(){
    this.dataSource.data.forEach(row => {
      if(row.entity.envoi != undefined){
        if(row.entity.envoi.id == this.envoi_id){
          console.log(row);
          this.selection.select(row);
        }
      }
    });
  }

  buildDataSource(){
    let ret = new Array();
    this.documents.forEach(d => {
      
      ret.push({'select': true , 'code': d.code , 'type': d.documentType.type , 'username': d.user.login , 'date': d.date.slice(0,10) , 'sent': d.sent , 'entity': d});
      
    });
    return ret;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  noSelection(){
    if(this.selection.selected.length > 0){
      return false;
    }else{
      return true;
    }
  }

  switchNewMoy(){
    this.showNewMoyen = !this.showNewMoyen;
  }

  switchView(){
    this.view.emit('list');
  }

  getRemovedDocuments(){
    this.removedDocuments = new Array();
    this.documents.forEach(document => {
      let e = false;
      this.selection.selected.forEach(data => {
        if(data.entity.id == document.id){
          e = true;
        }
        if(document.envoi == undefined){
          e = true;
        }
      });
      if(e == false){
        this.removedDocuments.push(document);
      }
    })
    console.log(this.removedDocuments);
  }

  getAddedDocuments(){
    this.addedDocuments = new Array();
    this.selection.selected.forEach(data => {
      if(data.entity.envoi == undefined){
        this.addedDocuments.push(data.entity);
      }
    });

  }

  findMoyenById(){
    let ret: MoyenAppro;
    this.moyens.forEach(moyen => {
      if(moyen.id == this.moyen_id){
        ret = moyen;
      }
    });
    return ret;
  }

  updateEnvoi(){
    this.envoiService.update(this.envoi).subscribe(res => {
      this.envoi = res;
      this.removeDocuments();
      this.addDocuments();
      this.notifySuccess('Entity updated!');
      this.switchView();
    } , err => {
      this.notifyError(err.message);
    })
  }

  addDocuments(){
    let observables = new Array();
    this.addedDocuments.forEach(d => {
      d.envoi = this.envoi;
      observables.push(this.documentService.switchSent(d));
    });
    forkJoin(observables).subscribe(res => {
      this.notifySuccess(`${this.addedDocuments.length} new documents added.`);
    } , err => {
      this.notifyError(err.message);
    })
  }

  removeDocuments(){
    let observables = new Array();
    this.removedDocuments.forEach(document => {
      observables.push(this.documentService.markUnsent(document.id));
    });
    forkJoin(observables).subscribe(res => {
      this.notifySuccess(`${this.removedDocuments.length} documents removed.`);
    } , err => {
      this.notifyError(err.message);
    })
  }

  execute(){
    this.getRemovedDocuments();
    this.getAddedDocuments();
    this.envoi.date = this.date;
    this.envoi.moyen = this.findMoyenById();
    this.envoi.qte = this.selection.selected.length;
    this.updateEnvoi();

  }
}
