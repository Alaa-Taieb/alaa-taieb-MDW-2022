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
import { TopBarComponent } from './main-page/top-bar/top-bar.component';
import { SideMenuComponent } from './main-page/side-menu/side-menu.component';
import { ActionSideComponent } from './main-page/action-side/action-side.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CollabFormComponent } from './main-page/action-side/collab-form/collab-form.component';
import { CollabListComponent } from './main-page/action-side/collab-list/collab-list.component';
import { AddRolePopupComponent } from './main-page/action-side/collab-form/add-role-popup/add-role-popup.component';
import { UpdateUserFormComponent } from './main-page/action-side/collab-list/update-user-form/update-user-form.component';
import { MaterialFormComponent } from './main-page/action-side/material-form/material-form.component';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginPageComponent,
    PopupErrorComponent,
    TopBarComponent,
    SideMenuComponent,
    ActionSideComponent,
    CollabFormComponent,
    CollabListComponent,
    AddRolePopupComponent,
    UpdateUserFormComponent,
    MaterialFormComponent,
    
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
