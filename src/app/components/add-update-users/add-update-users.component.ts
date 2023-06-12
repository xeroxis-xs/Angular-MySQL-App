import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-update-users',
  templateUrl: './add-update-users.component.html',
  styleUrls: ['./add-update-users.component.scss']
})
export class AddUpdateUsersComponent implements OnInit {
  frm!:FormGroup;
  action="Add";
  @ViewChild("userForm") usrForm!:NgForm; // it will be used for resetting the form validation messages
  
  get f(){
   return this.frm.controls;
  }
  errorMatcher= new MyErrorStateMatcher();

  constructor(private fb:FormBuilder,private route:ActivatedRoute,
    private userService:UserService,private snackBar: MatSnackBar){
   }

  ngOnInit(): void {
    this.getUserById();
    this.frm= this.fb.group({
      id:[0],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]]
    })
  }

  // fetching the user by id from the database
  getUserById= ()=>{
    const id= this.route.snapshot.params['id'];
    if(id){
      this.action="Update";
      this.userService.getById(id).subscribe({
        next:(user=>this.frm.patchValue(user)),
        error:(err)=>console.log(err)
      })
    }
  }

  onPost():void{
    this.userService.addUser(this.frm.value).subscribe({
      next:(data)=>{
        this.usrForm.reset();
        this.usrForm.resetForm();
        this.snackBar.open("success",'close',{
          duration:3000
        })
      },
      error:(err)=>{
        console.log(err);
        this.snackBar.open("error",'close',{
          duration:3000
        })
      }
     }
     )
  }
   
  }