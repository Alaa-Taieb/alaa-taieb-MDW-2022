import { RecieveService } from './../../../recieve/recieve.service';
import { MoyenApproService } from './../../../moyenAppro/moyen-appro.service';
import { Component, OnInit } from '@angular/core';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { MoyenAppro } from 'src/app/moyenAppro/MoyenAppro';
import { ToastrService } from 'ngx-toastr';
import { Recieve } from 'src/app/recieve/Recieve';

@Component({
  selector: 'app-add-recieve',
  templateUrl: './add-recieve.component.html',
  styleUrls: ['./add-recieve.component.css']
})
export class AddRecieveComponent implements OnInit {

  moyen: MoyenAppro;
  moyens: MoyenAppro[];
  moyen_id: number;
  newMoyen: MoyenAppro;
  showNewMoyen: boolean;
  faPlus = faPlusSquare;
  description: string;
  date: string;

  constructor(private toastr: ToastrService , private moyenService: MoyenApproService , private recieveService: RecieveService) { }

  ngOnInit(): void {
    this.getMoyens();
  }


  switchNewMoy(){
    this.showNewMoyen = !this.showNewMoyen;
  }

  getMoyens(){
    this.moyenService.getAllMoyen().subscribe(res => {
      this.moyens = res;
    } , err => {
      this.notifyError(err.message);
    })
  }

  switchView(){

  }

  findMoyenById(id: number){
    let ret;
    this.moyens.forEach(m => {
      if(m.id == id){
        ret = m;
      }
    });
    return ret;
  }

  execute(){
    let recieve: Recieve = {
      date: this.date,
      description: this.description
    };
    if(this.showNewMoyen){
      this.moyenService.addMoyen(this.newMoyen).subscribe(res => {
        this.moyen = res;
        recieve.moyen = this.moyen;
        this.recieveService.create(recieve).subscribe(res => {
          this.notifySuccess("Entity created successfully!");
        } , err => {
          this.notifyError(err.message);
        })
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      recieve.moyen = this.findMoyenById(this.moyen_id);
      this.recieveService.create(recieve).subscribe(res => {
        this.notifySuccess("Entity created successfully!");
      } , err => {
        this.notifyError(err.message);
      })
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
