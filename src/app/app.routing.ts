import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth /auth-guard.service ';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './table-list/table-list.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'queries',
    pathMatch: 'full',
  },
    // otherwise redirect to home
  { path: '', component: AdminLayoutComponent , canActivate: [AuthGuardService],
  children: [{
    path: '',
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]
},
  
  { path: 'login', component: LoginComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
 
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
