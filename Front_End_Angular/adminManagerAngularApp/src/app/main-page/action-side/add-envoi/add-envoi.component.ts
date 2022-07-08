import { EnvoiService } from './../../../envoi/envoi.service';
import { DocumentService } from './../../../document/document.service';
import { MoyenAppro } from './../../../moyenAppro/MoyenAppro';
import { Component, OnInit } from '@angular/core';
import { faCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Document } from 'src/app/document/Document';
import { ToastrService } from 'ngx-toastr';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MoyenApproService } from 'src/app/moyenAppro/moyen-appro.service';
import { Envoi } from 'src/app/envoi/Envoi';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-envoi',
  templateUrl: './add-envoi.component.html',
  styleUrls: ['./add-envoi.component.css']
})
export class AddEnvoiComponent implements OnInit {

  sentIcon = faCircle;
  documents: Document[];
  selectedDocuments: Document[];
  envoi: Envoi;
  date: string;
  moyen: MoyenAppro;
  moyens: MoyenAppro[];
  moyen_id: number;
  newMoyen: MoyenAppro;
  showNewMoyen: boolean;
  parsedDocuments;
  faPlus = faPlusSquare;
  dataSource;
  displayedColumns: string[] = ['select' ,'code', 'type' , 'username' , 'date' , 'sent'];
  selection = new SelectionModel<any>(true, []);

  constructor(private toastr: ToastrService , private documentService: DocumentService , private MoyenService: MoyenApproService , private envoiService: EnvoiService) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments(){
    this.documentService.getAll().subscribe(res => {
      this.documents = res;
      this.getMoyen();
      this.parsedDocuments = this.buildDataSource();
      this.dataSource = new MatTableDataSource<Document>(this.parsedDocuments);
    } , err => {
      this.notifyError(err.message);
    })
  }

  getMoyen(){
    this.MoyenService.getAllMoyen().subscribe(res => {
      this.moyens = res;
    } , err => {
      this.notifyError(err.message);
    })
  }

  switchNewMoy(){
    this.showNewMoyen = !this.showNewMoyen;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    console.log(this.selection.selected);
    return numSelected === numRows;
  }

  noSelection(){
    if(this.selection.selected.length > 0){
      return false;
    }else{
      return true;
    }
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  buildDataSource(){
    let ret = new Array();
    this.documents.forEach(d => {
      if(!d.sent){
        ret.push({'select': null , 'code': d.code , 'type': d.documentType.type , 'username': d.user.login , 'date': d.date.slice(0,10) , 'sent': d.sent , 'entity': d});
      }
    });
    return ret;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)

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

  switchView(){

  }

  attachDocuments(){
    let observables = new Array();
    this.selection.selected.forEach(s => {
      let document: Document = s.entity;
      document.envoi = this.envoi;
      observables.push(this.documentService.switchSent(document));
    })
    forkJoin(observables).subscribe(res => {
      this.notifySuccess(`${this.selection.selected.length} documents were sent!`);
    } , err => {
      this.notifyError(err.message);
    })
  }

  createEnvoi(envoi: Envoi){
    this.envoiService.create(envoi).subscribe(res => {
      this.envoi = res;
      this.attachDocuments()
    } , err => {
      this.notifyError(err.message);
    })
  }

  findMoyenById(id: number){
    let ret: MoyenAppro;
    this.moyens.forEach(moyen => {
      if(moyen.id == id){
        ret = moyen;
      }
    });
    return ret;
  }

  execute(){
    let envoi: Envoi = {
      date: this.date,
      qte: this.selection.selected.length
    }

    if(this.showNewMoyen){
      this.MoyenService.addMoyen(this.newMoyen).subscribe(res => {
        this.moyen = res;
        envoi.moyen = this.moyen;
        this.createEnvoi(envoi);
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      envoi.moyen = this.findMoyenById(this.moyen_id);
      this.createEnvoi(envoi);
    }
  }
}
