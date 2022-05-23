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
import {MatInputModule} from '@angular/material/input';

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
    MatButtonModule
    

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
