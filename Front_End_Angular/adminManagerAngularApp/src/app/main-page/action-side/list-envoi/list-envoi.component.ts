import { DocumentService } from './../../../document/document.service';
import { EnvoiService } from './../../../envoi/envoi.service';
import { Envoi } from './../../../envoi/Envoi';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { filter, forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Document } from 'src/app/document/Document';

@Component({
  selector: 'app-list-envoi',
  templateUrl: './list-envoi.component.html',
  styleUrls: ['./list-envoi.component.css']
})
export class ListEnvoiComponent implements OnInit {

  listEnvoi: Envoi[];
  displayedColumns = ['index' , 'moyen' , 'date' , 'quantity' , 'action'];
  dataSource;
  envoi_id;
  view: string = 'list';

  constructor(private toastr: ToastrService , private envoiService: EnvoiService , private documentService: DocumentService) { }

  ngOnInit(): void {
    this.getEnvois();
  }

  getEnvois(){
    this.envoiService.getAll().subscribe(res => {
      this.listEnvoi = res;
      this.dataSource = this.buildDateSource();
      this.dataSource = new MatTableDataSource<any>(this.dataSource);
    } , err => {
      this.notifyError(err.message);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  buildDateSource(){
    let ret = new Array();
    this.listEnvoi.forEach(e => {
      ret.push({'moyen': e.moyen.name , 'date': e.date , 'quantity': e.qte , 'entity': e});
    })
    return ret;
  }

  switchView(id: number){
    this.view = 'details';
    this.envoi_id = id;
  }

  unsendDocuments(envoi: Envoi){
    let observables = new Array();
    let documents: Document[];
    this.documentService.getByEnvoi(envoi).subscribe(res => {
      documents = res;
      documents.forEach(document => {
        observables.push(this.documentService.markUnsent(document.id));
      });
      forkJoin(observables).subscribe(res => {
        this.notifySuccess("Documents were marked unsent!");
        this.deleteEnvoi(envoi);
      } , err => {
        this.notifyError(err.message);
      })
    } , err => {
      this.notifyError(err.message);
    })
  }

  deleteEnvoi(envoi: Envoi){
    this.envoiService.delete(envoi.id).subscribe(res => {
      this.notifySuccess("Envoi deleted successfully!");
    } , err => {
      this.notifyError(err.message);
    })
  }

  delete(envoi: Envoi){
    this.unsendDocuments(envoi);
    this.getEnvois();
  }

  recieveMessage($event){
    this.getEnvois();
    this.view = $event;
  }
}
