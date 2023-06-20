import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user.service';
import { Input } from '@angular/core';


@Component({
  selector: 'app-add-update-users',
  templateUrl: './add-update-users.component.html',
  styleUrls: ['./add-update-users.component.scss']
})
export class AddUpdateUsersComponent implements OnInit {
  @Input()
  requiredFileType:string = '.jpg, .png, .jpeg';

  fileName = '';
  id:number;
  user: any;

  frm!:FormGroup;
  action="Add";
  @ViewChild("userForm") usrForm!:NgForm; // it will be used for resetting the form validation messages


  get f(){
   return this.frm.controls;
  }
  errorMatcher= new MyErrorStateMatcher();

  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private userService:UserService,
    private snackBar: MatSnackBar
    ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserById(this.id);

    if(this.id) {
      // Update
      this.frm= this.fb.group({
        id:[0],
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        contact:['',Validators.required],
        file:['', ]
      });
    }
    else {
      // Create
      this.frm= this.fb.group({
        id:[0],
        name:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        contact:['',Validators.required],
        file:['', Validators.required]
      });
    }
  }

  // fetching the user by id from the database
  getUserById = (id:number) => {
    if(id){
      this.action="Update";
      this.userService.getById(id).subscribe({
        next:(user) => {
          this.frm.patchValue(user);
          this.user = user;
          console.log(this.user)
        },
        error:(err)=>console.log(err)
      })
    }
  }

  onFormSubmit():void{
    const fd = new FormData();
    fd.append('id', this.frm.value.id);
    fd.append('name', this.frm.value.name);
    fd.append('email', this.frm.value.email);
    fd.append('contact', this.frm.value.contact);
    // actual file
    fd.append('file', this.frm.value.file);

    if (this.id) {
      // Update
      console.log(this.frm.value.file)
      if (this.frm.value.file != '') {
        // New file attached
        // Delete the old one
        console.log(this.user.url);
        this.userService.deleteFile(this.user.url).subscribe({
          next:(data) => {},
          error: (err) => {
            console.log(err);
          }
        })
      }
      this.userService.updateUser(fd).subscribe({
        next:(data)=>{
          this.usrForm.reset();
          this.usrForm.resetForm();
          this.snackBar.open("User updated",'close',{
            duration:3000
          });
        },
        error:(err)=>{
          console.log(err);
          this.snackBar.open("Error",'close',{
            duration:3000
          })
        }
       });
    }
    else {
      // Add
      this.userService.addUser(fd).subscribe({
        next:(data)=>{
          this.usrForm.reset();
          this.usrForm.resetForm();
          this.snackBar.open("New user added",'close',{
            duration:3000
          });
        },
        error:(err)=>{
          console.log(err);
          this.snackBar.open("Error",'close',{
            duration:3000
          })
        }
       })
    };
  }

  onFileSelected(event:any) {
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = fileInput.files?.[0] || null;
    if (file) {
        this.fileName = file.name;
    }
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.frm.patchValue({
        file: file
      });
    }
  }

}

