import { Document } from '../../../document/Document';
import { DocumentService } from '../../../document/document.service';
import { saveAs } from 'file-saver';
import { FileService } from '../../../fileEntity/file.service';
import { Component, OnInit } from '@angular/core';
import { FileEntity } from 'src/app/fileEntity/FileEntity';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  sentIcon = faCircle;
  bulletins: Document[];
  files: FileEntity[];
  File: FileEntity;
  SelectedBulletin: Document;
  dataSource;
  displayedColumns: string[] = ['code', 'type' , 'username' , 'date' , 'sent' , 'action'];
  view: string = 'list';
  bulletin_id: number;
  blob;
  constructor(private toastr: ToastrService , private documentService: DocumentService , private fileService: FileService) { }

  ngOnInit(): void {
    this.getBulletins();
    
  }

  getBulletins(){
    this.documentService.getAll().subscribe(res => {
      this.bulletins = res;
      console.log(this.bulletins);
      this.dataSource = new MatTableDataSource(this.createDataSource(this.bulletins));
    } , err => {
      this.notifyError(err.Message);
    })
  }

  createDataSource(b: Document[]){
    let ret = new Array();
    b.forEach(e => {
      ret.push({'code': e.code , 'type': e.documentType.type , 'username': e.user.login , 'date': e.date , 'sent': e.sent , 'bulletin': e});
    });
    return ret;
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

  getFile(id){
    this.fileService.getFile(id).subscribe(res => {
      this.File = res;
      saveAs(this.blob , this.File.name);
      
    } , err => {
      // Error
    })
  }

  download(id: number){
    this.fileService.downloadFile(id).subscribe(res => {
      this.blob = res;
      this.getFile(id);
    } , err => {
      console.log(err);
    })
  }


  delete(id: number){
    this.documentService.delete(id).subscribe(res => {
      this.notifySuccess("Item Deleted successfully!");
      this.getBulletins();
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

  switchView(id){
    this.view = 'update';
    this.bulletin_id = id;
  }
  
  recieveMessage($event){
    this.getBulletins();
    this.view = $event;
  }
}
