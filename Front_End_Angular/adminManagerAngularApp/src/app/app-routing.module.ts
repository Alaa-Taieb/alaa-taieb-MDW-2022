import { CollabPageComponent } from './collab-page/collab-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login-page' , component: LoginPageComponent  } ,
  { path: '' , component: MainPageComponent  },
  { path: 'collab-space' , component: CollabPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
