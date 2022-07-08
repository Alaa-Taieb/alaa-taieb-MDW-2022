import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupErrorComponent } from './login-page/pop-up/popup-error/popup-error.component';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogTitle, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopBarComponent } from './main-page/top-bar/top-bar.component';
import { SideMenuComponent } from './main-page/side-menu/side-menu.component';
import { ActionSideComponent } from './main-page/action-side/action-side.component';
import { AddCollabComponent } from './main-page/action-side/add-collab/add-collab.component';
import { ListCollabComponent } from './main-page/action-side/list-collab/list-collab.component';
import { UpdateCollabComponent } from './main-page/action-side/update-collab/update-collab.component';
import { DetailsCollabComponent } from './main-page/action-side/details-collab/details-collab.component';
import { AddMaterialComponent } from './main-page/action-side/add-material/add-material.component';
import { ListMaterialComponent } from './main-page/action-side/list-material/list-material.component';
import { MatCardModule } from '@angular/material/card';
import { UpdateMaterialComponent } from './main-page/action-side/update-material/update-material.component';
import { MaterialDetailsComponent } from './main-page/action-side/material-details/material-details.component';
import { Ng2SearchPipeModule , Ng2SearchPipe } from 'ng2-search-filter';
import { ConfirmationPopupComponent } from './pop-up/confirmation-popup/confirmation-popup.component';
import { ToastrModule } from 'ngx-toastr';
import { AffecterPopupComponent } from './pop-up/affecter-popup/affecter-popup.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ReapproMaterialComponent } from './main-page/action-side/reappro-material/reappro-material.component';
import { AddDocumentComponent } from './main-page/action-side/add-document/add-document.component';
import { ListDocumentComponent } from './main-page/action-side/list-document/list-document.component';
import { MatIconModule } from '@angular/material/icon';
import { UpdateDocumentComponent } from './main-page/action-side/update-document/update-document.component';
import { AddEnvoiComponent } from './main-page/action-side/add-envoi/add-envoi.component';
import { ListEnvoiComponent } from './main-page/action-side/list-envoi/list-envoi.component';
import { DetailsEnvoiComponent } from './main-page/action-side/details-envoi/details-envoi.component';
import { AddRecieveComponent } from './main-page/action-side/add-recieve/add-recieve.component';
import { ListRecieveComponent } from './main-page/action-side/list-recieve/list-recieve.component';
import { UpdateRecieveComponent } from './main-page/action-side/update-recieve/update-recieve.component';
import { AddReunionComponent } from './main-page/action-side/add-reunion/add-reunion.component'
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ListReunionComponent } from './main-page/action-side/list-reunion/list-reunion.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddFileComponent } from './main-page/pop-ups/add-file/add-file.component';
import { ReunionDetailsComponent } from './main-page/action-side/reunion-details/reunion-details.component';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CollabPageComponent } from './collab-page/collab-page.component';
import { LeftMenuComponent } from './collab-page/left-menu/left-menu.component';
import { CollabDashboardComponent } from './collab-page/collab-dashboard/collab-dashboard.component';
import { CollabReunionComponent } from './collab-page/collab-reunion/collab-reunion.component';
import { CollabDemandeComponent } from './collab-page/collab-demande/collab-demande.component';
import { CollabMaterialComponent } from './collab-page/collab-material/collab-material.component';
import { CollabAccountComponent } from './collab-page/collab-account/collab-account.component';
import { CollabReunionDetailsComponent } from './collab-page/collab-reunion-details/collab-reunion-details.component'; // a plugin!
import { MatNativeDateModule } from '@angular/material/core';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PopupErrorComponent,
    MainPageComponent,
    TopBarComponent,
    SideMenuComponent,
    ActionSideComponent,
    AddCollabComponent,
    ListCollabComponent,
    UpdateCollabComponent,
    DetailsCollabComponent,
    AddMaterialComponent,
    ListMaterialComponent,
    UpdateMaterialComponent,
    MaterialDetailsComponent,
    ConfirmationPopupComponent,
    AffecterPopupComponent,
    ReapproMaterialComponent,
    AddDocumentComponent,
    ListDocumentComponent,
    UpdateDocumentComponent,
    AddEnvoiComponent,
    ListEnvoiComponent,
    DetailsEnvoiComponent,
    AddRecieveComponent,
    ListRecieveComponent,
    UpdateRecieveComponent,
    AddReunionComponent,
    ListReunionComponent,
    AddFileComponent,
    ReunionDetailsComponent,
    CollabPageComponent,
    LeftMenuComponent,
    CollabDashboardComponent,
    CollabReunionComponent,
    CollabDemandeComponent,
    CollabMaterialComponent,
    CollabAccountComponent,
    CollabReunionDetailsComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    NgxMatTimepickerModule,
    ReactiveFormsModule,
    MatTooltipModule,
    NgxMatTimepickerModule,
    FullCalendarModule,
    MatNativeDateModule
    

    
    
    

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
      
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
