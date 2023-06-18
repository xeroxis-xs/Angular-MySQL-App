import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/models/MyErrorStateMatcher';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { Subscription, finalize } from 'rxjs';
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
  // uploadProgress:number = 0;
  // uploadSub: Subscription = new Subscription();

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
    private snackBar: MatSnackBar,
    private http: HttpClient
    ){}

  ngOnInit(): void {
    this.getUserById();
    this.frm= this.fb.group({
      id:[0],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      contact:['',Validators.required],
      // file:['',Validators.required],
      file:['', Validators.required]
    })
  }

  // fetching the user by id from the database
  getUserById= ()=>{
    const id= this.route.snapshot.params['id'];
    if(id){
      this.action="Update";
      this.userService.getById(id).subscribe({
        next:(user) => {
          this.frm.patchValue(user);
        },
        error:(err)=>console.log(err)
      })
    }
  }

  onFormSubmit():void{

    const fd = new FormData();
    fd.append('id', this.frm.value.id)
    fd.append('name', this.frm.value.name)
    fd.append('email', this.frm.value.email)
    fd.append('contact', this.frm.value.contact)
    fd.append('file', this.frm.value.file)
    // console.log('fd', fd.get('file'))


    this.userService.addUser(fd).subscribe({
      next:(data)=>{
        this.usrForm.reset();
        this.usrForm.resetForm();
        this.snackBar.open("Submitted",'close',{
          duration:3000
        });
        
      },
      error:(err)=>{
        console.log(err);
        this.snackBar.open("Error",'close',{
          duration:3000
        })
      }
     }
     )
  }

  onFileSelected(event:any) {
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = fileInput.files?.[0] || null;
    
    if (file) {
        this.fileName = file.name;
    }
    //     const formData = new FormData();
    //     formData.append("file", file);

    //     const upload$ = this.userService.upload(this.frm.value)
    //     .pipe(
    //         finalize(() => this.reset())
    //     );
      
    //     this.uploadSub = upload$.subscribe(event => {
    //       if (event.type == HttpEventType.UploadProgress) {
    //         const total = event.total ?? 0;
    //         this.uploadProgress = Math.round(100 * (event.loaded / total));
    //       }
    //     })
    // }

    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.frm.patchValue({
        file: file
      });
    }
  }

  // cancelUpload() {
  //   this.uploadSub.unsubscribe();
  //   this.reset();
  // }

  // reset() {
  //   this.uploadProgress = 0;
  //   this.uploadSub = new Subscription();
  // }

  // requiredFileType:string = '.jpg, .png, .jpeg';
  // myForm!: FormGroup;
  // // myForm = new FormGroup({
  // //   id: new FormControl([0]),
  // //   email: new FormControl('', [Validators.required, Validators.email]),
  // //   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  // //   contact: new FormControl('', [Validators.required]),
  // //   url: new FormControl('', [Validators.required]),
  // //   file: new FormControl('', [Validators.required])
  // // });



  // constructor(
  //   private fb:FormBuilder,
  //   private route:ActivatedRoute,
  //   private userService:UserService,
  //   private snackBar: MatSnackBar,
  //   private http: HttpClient
  // ){}

  // get f(){
  //   return this.myForm.controls;
  // }

  // // fileName = '';
  // uploadProgress:number = 0;
  // uploadSub: Subscription = new Subscription();

  // // frm!:FormGroup;
  // action="Add";
  // // @ViewChild("userForm") usrForm!:NgForm; // it will be used for resetting the form validation messages
  
  


  // ngOnInit(): void {
  //   this.getUserById();
  //   this.myForm = this.fb.group({
  //     id: [0],
  //     email: ['', [Validators.required, Validators.email]],
  //     name: ['', [Validators.required, Validators.minLength(3)]],
  //     contact: ['', [Validators.required]],
  //     url: ['', [Validators.required]],
  //     file: ['', [Validators.required]]
  //   });
  

  //   // this.frm= this.fb.group({
  //   //   id:[0],
  //   //   name:['',Validators.required],
  //   //   email:['',[Validators.required,Validators.email]],
  //   //   contact:['',Validators.required],
  //   //   url:['',Validators.required],
  //   // })
  // }

  // onFileChange(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.myForm.patchValue({
  //       url: file
  //     });
  //   }
  // }

  // onFormSubmit(){
  //   const formData = new FormData();
  //   formData.append('file', this.myForm.get('url')?.value ?? '');
   
    
  //   this.userService.addUser(formData)
  //     .subscribe(res => {
  //       console.log(res);
  //       alert('Uploaded Successfully.');
  //     })
  // }


  // // fetching the user by id from the database
  // getUserById= ()=>{
  //   const id= this.route.snapshot.params['id'];
  //   if(id){
  //     this.action="Update";
  //     this.userService.getById(id).subscribe({
  //       next:(user) => {
  //         this.myForm.patchValue(user);
  //       },
  //       error:(err)=>console.log(err)
  //     })
  //   }
  // }


}
   
