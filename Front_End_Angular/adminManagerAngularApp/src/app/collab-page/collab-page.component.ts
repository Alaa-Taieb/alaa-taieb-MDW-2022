import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHandshake, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faTable, faHeadset, faBox, faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StringFilterUI } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-collab-page',
  templateUrl: './collab-page.component.html',
  styleUrls: ['./collab-page.component.css']
})
export class CollabPageComponent implements OnInit {

  dashboardIcon = faTable;
  reunionIcon = faHeadset;
  demandeIcon = faHandshake;
  materielIcon = faBox;
  accountIcon = faInfoCircle;
  logoutIcon = faArrowRight;
  userIcon = faUserCircle;
  role: string;
  username: string;
  page: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem("LoggedUser")).login;
    this.role = JSON.parse(localStorage.getItem("LoggedUser")).role.name;
    this.page = "Dashboard";
  }

  public goToLogin():void {
    localStorage.removeItem("JWT");
    localStorage.removeItem("LoggedUser");
    this.router.navigate(['/login-page']);
  }

  changePage(page: string){
    this.page = page;
  }

  recieveMessage($event){
    this.page = $event;
  }
}
