import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss'],
})
export class LoadUsersComponent implements OnInit {
  dataSource = new MatTableDataSource<UserModel>();
  displayColumns = ['id', 'name', 'email', 'contact', 'url', 'action'];
  pageSizeOptions = [5, 10, 15, 12];
  pageSize = 5;
  pageIndex = 0;
  pageLength = 0; //total records in db
  tempUser: any;

  ngOnInit(): void {
    this.loadUsers();
  }

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loadUsers() {
    this.userService.getUsers(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response) => {
        this.dataSource.data = response;
        console.log(this.dataSource.data);
      },
      error: (err) => console.error(err),
    });
    this.userService.getUsersCount().subscribe({
      next: (response) => {
        // console.log(response);
        this.pageLength = response;
      },
      error: (err) => console.error(err),
    });
  }

  changePage(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadUsers();
  }

  onBtnEdit(id: number): void {
    this.router.navigate(['/users/edit/' + id]);
  }

  onBtnView(id: number): void {
    this.router.navigate(['/users/view/' + id]);
  }

  onBtnDelete(id: number): void {
    if (window.confirm('Are you sure to delete?')) {
      {
        // Get and temp store that user
        this.userService.getById(id).subscribe({
          next: (user) => {
            this.tempUser = user;
            console.log(user);
            // Delete that user's file
            this.userService.deleteFile(this.tempUser.url).subscribe({
              next: (data) => {
                console.log('User file deleted!');
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
          error: (err) => console.log(err),
        });

        // Delete that user from DB
        this.userService.delete(id).subscribe({
          next: (resp) => {
            if (this.dataSource.data.length === 1 && this.pageIndex > 0)
              this.pageIndex--;
            this.snackBar.open('Deleted', 'close', {
              duration: 3000,
            });
            this.loadUsers();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
