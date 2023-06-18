import { Component,OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-load-users',
  templateUrl: './load-users.component.html',
  styleUrls: ['./load-users.component.scss']
})
export class LoadUsersComponent implements OnInit {
  
  dataSource=new MatTableDataSource<UserModel>();
  displayColumns = ['id','name','email','contact','url','action'];
  pageSizeOptions=[3,6,9,12];
  pageSize=3;
  pageIndex=0
  pageLength=0; //total records in db
  
  loadUsers(){
    this.userService.getUsers((this.pageIndex+1),this.pageSize).subscribe({
      next:(response)=>{
        this.dataSource.data = response;  
        console.log(this.dataSource.data)
    },
      error:(err)=>console.error(err)
    });
    this.userService.getUsersCount().subscribe({
      next:(response)=>{
        this.pageLength = response; 
    },
      error:(err)=>console.error(err)
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  changePage(event:PageEvent){
    this.pageSize=event.pageSize;
    this.pageIndex=event.pageIndex;
    this.loadUsers();
   }

   onBtnEdit(id:number):void{
    this.router.navigate(['/users/edit/'+id]);
  }

  onBtnDelete(id:number):void{
    if(window.confirm('are you sure to delete?')){
     {
       this.userService.delete(id).subscribe({
         next:(resp)=>{
           if(this.dataSource.data.length===1&&this.pageIndex>0)
               this.pageIndex--;
            this.snackBar.open("Deleted",'close',{
              duration:3000
            })
           this.loadUsers();
         },
         
       })
     }
   }
 }
  
  constructor(
    private userService:UserService,
    private router:Router,
    private snackBar: MatSnackBar
  ) { }

}
