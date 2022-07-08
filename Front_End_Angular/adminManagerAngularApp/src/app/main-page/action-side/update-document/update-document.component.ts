import { DocumentTypeService } from './../../../documentType/document-type.service';
import { Document } from '../../../document/Document';
import { DocumentService } from '../../../document/document.service';
import { saveAs } from 'file-saver';
import { FileService } from '../../../fileEntity/file.service';
import { UserService } from '../../../user/user.service';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/user/User';
import { FileEntity } from 'src/app/fileEntity/FileEntity';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faExclamationTriangle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { DocumentType } from 'src/app/documentType/DocumentType';


@Component({
  selector: 'app-update-bulletin-s',
  templateUrl: './update-document.component.html',
  styleUrls: ['./update-document.component.css']
})
export class UpdateDocumentComponent implements OnInit {
  faPlus = faPlusSquare;
  file: File = null;
  fileEntity: FileEntity;
  newFileEntity: FileEntity = null;
  finalFileEntity: FileEntity = null;
  @Input() bulletin_id: number;
  @Output() view = new EventEmitter();
  bulletin: Document;
  code: string;
  date: string;
  user_id: number;
  file_id: number;
  users: User[];
  okState = faCheckCircle;
  warnState = faExclamationTriangle;
  fileUploaded: boolean = false;
  type_id: number;
  type: DocumentType;
  newType: string;
  showNewType: boolean = false;
  types: DocumentType[];
  @ViewChild('FileInput')
  myInputVariable: ElementRef;

  constructor(private toastr: ToastrService , private documentService: DocumentService , private userService: UserService , private fileService: FileService , private documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getUsers();
    
  }

  getDocumentTypes(){
    this.documentTypeService.getAll().subscribe(res => {
      this.types = res;
      
    } , err => {
      this.notifyError(err.message);
    })
  }

  getBulletin(){
    this.documentService.getById(this.bulletin_id).subscribe(res => {
      this.bulletin = res;
      this.code = res.code;
      this.date = res.date.slice(0,10);
      this.user_id = res.user.id;
      this.file_id = res.file.id;
      this.type_id = this.bulletin.documentType.id;
      console.log(res);
      this.getFile();
      console.log(this.date);
    } , err => {
      this.notifyError(err.Message);
    })
  } 

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
      this.getBulletin();
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

  removeFile(file: FileEntity){
    this.myInputVariable.nativeElement.value = "";
    this.deleteFile(file);
  }

  deleteFile(file: FileEntity){
    if(this.fileUploaded){
      this.fileService.deleteFile(file).subscribe(res => {
        this.notifySuccess("File deleted from database!");
        this.newFileEntity = null;
        this.fileUploaded = false;
      } , err => {
        this.notifyError(err);
      })
    }
  }

  cancel(){
    this.code = '';
    this.date = '';
    this.user_id = null;
  }

  onFileChange(event: any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }

  getFile(){
    
    this.fileService.getFile(this.file_id).subscribe(res => {
      this.fileEntity = res;
      let data = new Array<Blob>();
      data.push(res.data);
      this.file = new File(data , res.name);
    } , err => {
      this.notifyError(err.message);
    })
  }
 
  upload() {
    if (this.file) {
      this.fileService.uploadFile(this.file).subscribe(resp => {
        this.notifySuccess("File uploaded!");
        this.fileUploaded = true;
        if(this.newFileEntity == null){
          this.newFileEntity = resp;
        }else{
          this.deleteFile(this.newFileEntity);
          this.newFileEntity = resp;
        }
      })
    } else {
      alert("Please select a file first")
    }
  }

  download(){
    this.fileService.downloadFile(this.file_id).subscribe(res => {
   
      saveAs(res , 'Image.png');
    } , err => {
      console.log(err);
    })
  }

  findUser(id){
    let ret: User;
    this.users.forEach(user => {
      if(user.id == id){
        ret = user;
      }
    })
    return ret;
  }

  Update(){
    if(this.newFileEntity != null){
      this.finalFileEntity = this.newFileEntity;
    }else{
      this.finalFileEntity = this.fileEntity;
    }
    let Bulletin: Document;
    Bulletin = {
      id: this.bulletin_id,
      code: this.code,
      date: this.date,
      user: this.findUser(this.user_id),
      sent: this.bulletin.sent,
      file_id: this.finalFileEntity.id,
      send_date: this.bulletin.send_date
    }
    if(this.showNewType){
      this.documentTypeService.create(this.newType).subscribe(res => {
        let documentType: DocumentType = res;
        Bulletin.documentType = documentType;
        this.documentService.update(Bulletin).subscribe(res => {
          this.notifySuccess("Entity updated successfully!");
          if(this.finalFileEntity != this.fileEntity){
            this.deleteFile(this.fileEntity);
          }
          // go back to list
        } , err => {  
          this.notifyError(err.message);
        })
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      Bulletin.documentType = this.findTypeById(this.type_id);
      this.documentService.update(Bulletin).subscribe(res => {
        this.notifySuccess("Entity updated successfully!");
        if(this.finalFileEntity != this.fileEntity){
          this.deleteFile(this.fileEntity);
        }
        // go back to list
      } , err => {  
        this.notifyError(err.message);
      })
    }
    
  }

  findTypeById(id: number){
    let ret: DocumentType;
    this.types.forEach(type => {
      if(type.id == id){
        ret = type;
      }
    });
    return ret;
  }

  switchView(){
    this.view.emit("list");
  }
  switchNewType(){
    this.showNewType = !this.showNewType;
  }
}
