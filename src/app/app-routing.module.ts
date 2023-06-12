import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path:'users/add',component:AddUpdateUsersComponent},
  {path:'users/edit/:id',component:AddUpdateUsersComponent},
  {path:'users',component:LoadUsersComponent},
  {path:'',redirectTo:'/users',pathMatch:'full'},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
