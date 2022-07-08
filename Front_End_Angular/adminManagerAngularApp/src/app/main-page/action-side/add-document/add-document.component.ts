import { DocumentTypeService } from './../../../documentType/document-type.service';
import { Document } from '../../../document/Document';
import { DocumentService } from '../../../document/document.service';
import { FileEntity } from '../../../fileEntity/FileEntity';
import { UserService } from '../../../user/user.service';
import { FileService } from '../../../fileEntity/file.service';
import { Component, ElementRef, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { User } from 'src/app/user/User';
import { ToastrService } from 'ngx-toastr';
import { faCheckCircle, faExclamationTriangle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { ViewChild } from '@angular/core';
import { DocumentType } from 'src/app/documentType/DocumentType';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {

  faPlus = faPlusSquare;
  file: File = null;
  fileEntity: FileEntity;
  id: number;
  date: string;
  code: string;
  users: User[];
  user_id: number;
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
  


  constructor(private toastr: ToastrService , private fileService: FileService , private userService: UserService , private documentService: DocumentService , private documentTypeService: DocumentTypeService) { }

  ngOnInit(): void {
    this.getDocumentTypes();
    this.getUsers();
  }

  onFileChange(event: any) {
    console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  getDocumentTypes(){
    this.documentTypeService.getAll().subscribe(res => {
      this.types = res;
    } , err => {
      this.notifyError(err.message);
    })
  }

  upload() {
    if (this.file) {
      this.fileService.uploadFile(this.file).subscribe(resp => {
        this.notifySuccess("File uploaded!");
        this.fileUploaded = true;
       this.fileEntity = resp;
      })
    } else {
      alert("Please select a file first")
    }
  }

  download(){
    this.fileService.downloadFile(this.id).subscribe(res => {
   
      saveAs(res , 'Image.png');
    } , err => {
      console.log(err);
    })
  }

  getUsers(){
    this.userService.getUsers().subscribe(res => {
      this.users = res;
    } , err => {
      this.notifyError(err);
    })
  }

  findUser(id: number){
    let ret;
    this.users.forEach(user =>{
      if(user.id == id){
        ret = user;
      }
    });
    return ret;
  }

  createBulletin(){
    let user: User = this.findUser(this.user_id);
    let bulletin: Document = {
      code: this.code,
      user: user,
      date: this.date,
      file_id: this.fileEntity.id,
      sent: false
    }
    if(this.showNewType){
      this.documentTypeService.create(this.newType).subscribe(res => {
        let documentType: DocumentType = res;
        bulletin.documentType = documentType;
        this.documentService.add(bulletin).subscribe(res => {
          this.notifySuccess("Bulletin saved successfully!");
        } , err=> {
          this.notifyError(err.Message);
        })
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      bulletin.documentType = this.findTypeById(this.type_id);
      this.documentService.add(bulletin).subscribe(res => {
        this.notifySuccess("Bulletin saved successfully!");
      } , err=> {
        this.notifyError(err.Message);
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

  removeFile(){
    this.myInputVariable.nativeElement.value = "";
    if(this.fileUploaded){
      this.fileService.deleteFile(this.fileEntity).subscribe(res => {
        this.notifySuccess("File deleted from database!");
        this.fileEntity = null;
        this.fileUploaded = false;
      } , err => {
        this.notifyError(err);
      })
    }else{
      this.fileEntity = null;
    }
  }

  cancel(){
    this.code = '';
    this.date = '';
    this.user_id = null;
    this.removeFile();
  }

  switchNewType(){
    this.showNewType = !this.showNewType;
  }
}
