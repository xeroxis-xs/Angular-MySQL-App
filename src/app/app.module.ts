import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav';
import { NavComponent } from './components/nav/nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoadUsersComponent } from './components/load-users/load-users.component';
import { AddUpdateUsersComponent } from './components/add-update-users/add-update-users.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewTempComponent } from './components/view-temp/view-temp.component';
import { ViewHumidComponent } from './components/view-humid/view-humid.component';
import { ViewPsiComponent } from './components/view-psi/view-psi.component';
import { ViewPm25Component } from './components/view-pm25/view-pm25.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotfoundComponent,
    LoadUsersComponent,
    AddUpdateUsersComponent,
    ViewUserComponent,
    ViewTempComponent,
    ViewHumidComponent,
    ViewPsiComponent,
    ViewPm25Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, FormsModule,
    BrowserAnimationsModule,MatToolbarModule,MatSidenavModule,MatIconModule,
    MatListModule,MatTableModule,MatPaginatorModule,MatButtonModule,MatSnackBarModule,MatCardModule,MatFormFieldModule,MatInputModule, MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
