import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  user: any;

  constructor(
    private userService:UserService,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadAUser();
  }

  loadAUser(){
    const id = this.route.snapshot.params['id'];
    this.userService.getById(id).subscribe({
      next:(response)=>{
        this.user = response;
        console.log(this.user)
    },
      error:(err)=>console.error(err)
    });
  }

  onBtnEdit(id:number):void{
    this.router.navigate(['/users/edit/'+id]);
  }

  onBtnDelete(id:number):void{
    if(window.confirm('Are you sure to delete?')){
     {
       this.userService.delete(id).subscribe({
         next:(resp)=>{
          this.router.navigate(['/users']);
          this.snackBar.open("Deleted",'close',{
            duration:3000
          });
         },

        })
      }
    }
  }



}
