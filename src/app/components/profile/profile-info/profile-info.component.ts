import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  email:string
 userId:number
 user:User
  updateForm:FormGroup
  constructor(private userService:UserService,private toastrService:ToastrService,private formBuiler:FormBuilder) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUserById();
    this.createUpdateForm();
  }


  createUpdateForm(){
    this.updateForm = this.formBuiler.group({
      id:this.userId,
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      status:true
    })
  }
  getUserId(){
  this.userId= this.userService.getUserId();
  }

  getUserById(){
    this.userService.getById(this.userId).subscribe(response=>{
    this.user = response.data;
    console.log(this.user)
    })
  }

  updateForProfile(){
    if (!this.updateForm.value.firstName&& !this.updateForm.value.lastName &&!this.updateForm.value.email) {
      if(!this.updateForm.value.password){
      this.toastrService.error("Form is invalid ","Invalid")
    }else{
      this.updateForm.value.firstName = this.user.firstName;
      this.updateForm.value.lastName = this.user.lastName;
      this.updateForm.value.email = this.user.email;
        let profileModel = Object.assign({},this.updateForm.value);
        this.userService.updateForProfile(profileModel).subscribe(response=>{
       this.toastrService.success(response.message)  
       setTimeout(() => {
        window.location.reload();
      }, 500);
      },responseError=>{
        this.toastrService.error(responseError.error);
       })
      }
    }
  }

}
