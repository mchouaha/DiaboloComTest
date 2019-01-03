import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterComponent } from './master/master.component';
import { LoginComponent } from './login/login.component';
import { MasterGuard } from './master.guard';
import { LoginGuard } from './login.guard';
import {AuthGuard} from './auth.guard';
import {AppComponent} from './app.component';

const routes: Routes = [
  { path: '',  component: LoginComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  { path: 'master', component: MasterComponent, canActivate: [MasterGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
