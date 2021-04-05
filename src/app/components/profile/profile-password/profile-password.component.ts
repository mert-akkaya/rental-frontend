import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.css']
})
export class ProfilePasswordComponent implements OnInit {

  userId:number;
  user:User
  passwordAgain:string
  passwordUpdateForm:FormGroup
  constructor(private userService:UserService,private formBuilder:FormBuilder,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUserById();
    this.createUpdatePassword();
  }

  getUserId(){
    this.userId= this.userService.getUserId();
    }
  
    getUserById(){
      this.userService.getById(this.userId).subscribe(response=>{
      this.user = response.data;
      })
    }


    createUpdatePassword(){
     this.passwordUpdateForm = this.formBuilder.group({
       id:[],
       firstName:[],
       lastName:[],
       email:[],
       password:["",Validators.required],
       passwordAgain:[],
       status:[]
     })
    }
    comparePassword(){
      if (this.passwordAgain == this.passwordUpdateForm.value.password) {
        return true;
      }else{
        return false;
      }
    }
    updatePassword(){
      if (this.passwordUpdateForm.valid) {
        if (this.passwordAgain && this.comparePassword()) {
          this.passwordUpdateForm.patchValue({
            id:this.user.id,
            firstName:this.user.firstName,
            lastName:this.user.lastName,
            email:this.user.email,
            status:this.user.status,
            passwordAgain:this.passwordAgain
          })
          let updatePasswordModel = Object.assign({},this.passwordUpdateForm.value)
          this.userService.updateForProfile(updatePasswordModel).subscribe(response=>{
            this.toastrService.success(response.message)
            setTimeout(() => {
              window.location.reload();
            }, 500);
          })
        }else{
          this.toastrService.error("Form is invalid","Invalid")
        }
      }
      else{
        this.toastrService.error("Form is invalid","Invalid")
      }
    }
}
