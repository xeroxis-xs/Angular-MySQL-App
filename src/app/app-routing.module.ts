import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewTempComponent } from './components/view-temp/view-temp.component';
import { ViewHumidComponent } from './components/view-humid/view-humid.component';
import { ViewPsiComponent } from './components/view-psi/view-psi.component';
import { ViewPm25Component } from './components/view-pm25/view-pm25.component';

const routes: Routes = [
  {path:'users/add',component:AddUpdateUsersComponent},
  {path:'users/edit/:id',component:AddUpdateUsersComponent},
  {path:'users/view/:id',component:ViewUserComponent},
  {path:'users',component:LoadUsersComponent},
  {path:'',redirectTo:'/users',pathMatch:'full'},
  {path:'**',component:NotfoundComponent},
  {path:'temp',component:ViewTempComponent},
  {path:'humid',component:ViewHumidComponent},
  {path:'psi',component:ViewPsiComponent},
  {path:'pm25',component:ViewPm25Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
