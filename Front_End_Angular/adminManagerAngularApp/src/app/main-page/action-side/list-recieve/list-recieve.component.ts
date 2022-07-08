import { RecieveService } from './../../../recieve/recieve.service';
import { Component, OnInit } from '@angular/core';
import { Recieve } from 'src/app/recieve/Recieve';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-recieve',
  templateUrl: './list-recieve.component.html',
  styleUrls: ['./list-recieve.component.css']
})
export class ListRecieveComponent implements OnInit {

  recieves: Recieve[];
  displayedColumns = ['index' , 'date' , 'moyen' , 'action'];
  view: string = 'list';
  recieve_id: number;
  dataSource;

  constructor(private toastr: ToastrService , private recieveService: RecieveService) { }

  ngOnInit(): void {
    this.getRecieves();
  }

  getRecieves(){
    this.recieveService.getAll().subscribe(res => {
      this.recieves = res;
      this.dataSource = this.buildDateSource();
      this.dataSource = new MatTableDataSource<any>(this.dataSource);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
    this.recieves.forEach(e => {
      ret.push({'date': e.date.slice(0,10) , 'moyen': e.moyen.name , 'entity': e});
    })
    return ret;
  }

  switchView(id: number){
    this.recieve_id = id;
    this.view = 'update';
  }

  delete(id: number){
    this.recieveService.delete(id).subscribe(res => {
      this.notifySuccess("Entity deleted!");
      this.getRecieves();
    } , err => {
      this.notifyError(err.message);
    })
  }

  recieveMessage($event){
    this.getRecieves();
    this.view = $event;
  }

}
