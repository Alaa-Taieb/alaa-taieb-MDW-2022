import { FileService } from './../../../fileEntity/file.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileEntity } from 'src/app/fileEntity/FileEntity';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
  @ViewChild('labelImport')
  labelImport: ElementRef;
  
  public formImport: FormGroup;
  file: File = null;
  fileEntity: FileEntity;
  constructor(private toastr: ToastrService , public dialogRef: MatDialogRef<AddFileComponent> , @Inject(MAT_DIALOG_DATA) public data , private fileService: FileService) {
    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
  }

  onFileChange(event) {
    let files: FileList = event.target.files;
    this.file = files[0];
  }

  

  closeDialog(){
    this.dialogRef.close(false);
  }

  upload(){
    console.log(this.file);
    if (this.file) {
      this.fileService.uploadFile(this.file).subscribe(resp => {
        this.notifySuccess("PV téléchargé !");
        this.fileEntity = resp;
        this.dialogRef.close(this.fileEntity);
      })
    } else {
      this.notifyError("Veuillez d'abord sélectionner un PV.");
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

}
