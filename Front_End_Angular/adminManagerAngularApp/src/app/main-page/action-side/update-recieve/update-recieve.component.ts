import { MoyenApproService } from './../../../moyenAppro/moyen-appro.service';
import { Recieve } from './../../../recieve/Recieve';
import { RecieveService } from './../../../recieve/recieve.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MoyenAppro } from 'src/app/moyenAppro/MoyenAppro';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-recieve',
  templateUrl: './update-recieve.component.html',
  styleUrls: ['./update-recieve.component.css']
})
export class UpdateRecieveComponent implements OnInit {

  @Input() recieve_id: number;
  @Output() view = new EventEmitter();
  recieve: Recieve;
  moyen: MoyenAppro;
  moyens: MoyenAppro[];
  moyen_id: number;
  newMoyen: MoyenAppro;
  showNewMoyen: boolean;
  faPlus = faPlusSquare;
  description: string;
  date: string;

  constructor(private toastr: ToastrService , private recieveService: RecieveService , private moyenService: MoyenApproService) { }

  ngOnInit(): void {
    this.getRecieve();
  }

  getRecieve(){
    this.recieveService.getById(this.recieve_id).subscribe(res => {
      this.recieve = res;
      this.getMoyens();
      
      this.date = res.date.slice(0,10);
      this.description = res.description;
    } , err => {
      this.notifyError(err.message);
    })
  }

  getMoyens(){
    this.moyenService.getAllMoyen().subscribe(res => {
      this.moyens = res;
      this.moyen_id = this.recieve.moyen.id;
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

  sendMessage(){
    this.view.emit('list');
  }

  switchNewMoy(){
    this.showNewMoyen = !this.showNewMoyen;
  }

  findMoyenById(id: number){
    let ret;
    this.moyens.forEach(m => {
      if(id == m.id){
        ret = m;
      }
    });
    return ret;
  }

  execute(){
    this.recieve.date = this.date;
    this.recieve.description = this.description;
    if(this.showNewMoyen){
      this.moyenService.addMoyen(this.newMoyen).subscribe(res => {
        this.recieve.moyen = res;
        this.recieveService.update(this.recieve).subscribe(res => {
          this.notifySuccess("Entity saved!");
          this.sendMessage();
        } , err => {
          this.notifyError(err.message);
        })
      } , err => {
        this.notifyError(err.message);
      })
    }else{
      this.recieve.moyen = this.findMoyenById(this.moyen_id);
      this.recieveService.update(this.recieve).subscribe(res => {
        this.notifySuccess("Entity saved!");
        this.sendMessage();
      } , err => {
        this.notifyError(err.message);
      })
    }
  }
}
