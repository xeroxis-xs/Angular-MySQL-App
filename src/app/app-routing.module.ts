import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { LoadTempComponent } from './components/load-temp/load-temp.component';
import { LoadHumidComponent } from './components/load-humid/load-humid.component';
import { LoadPsiComponent } from './components/load-psi/load-psi.component';
import { LoadPm25Component } from './components/load-pm25/load-pm25.component';
import { LoadHomeComponent } from './components/load-home/load-home.component';
import { ViewTempComponent } from './components/view-temp/view-temp.component';
import { ViewHumidComponent } from './components/view-humid/view-humid.component';
import { ViewPm25Component } from './components/view-pm25/view-pm25.component';
import { ViewPsiComponent } from './components/view-psi/view-psi.component';
import { ViewLevelComponent } from './components/view-level/view-level.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LoadHomeComponent },

  { path: 'users/add', component: AddUpdateUsersComponent },
  { path: 'users/edit/:id', component: AddUpdateUsersComponent },
  { path: 'users/view/:id', component: ViewUserComponent },
  { path: 'users', component: LoadUsersComponent },

  { path: 'temp', component: LoadTempComponent },
  { path: 'temp/view/:id', component: ViewTempComponent },

  { path: 'humid', component: LoadHumidComponent },
  { path: 'humid/view/:id', component: ViewHumidComponent },

  { path: 'psi', component: LoadPsiComponent },
  { path: 'psi/view/:id', component: ViewPsiComponent },

  { path: 'pm25', component: LoadPm25Component },
  { path: 'pm25/view/:id', component: ViewPm25Component },

  { path: 'level/:id', component: ViewLevelComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
