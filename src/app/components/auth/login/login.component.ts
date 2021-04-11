import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { timer } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private authService:AuthService,
    private localStorageService:LocalStorageService,private router:Router) { 
      
    }

  ngOnInit(): void {
    this.createLoginForm();
  }
  
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    });
  }


  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value);
      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info(response.message)
        this.localStorageService.set("Token",response.data.token);
        this.localStorageService.set("Expiration",response.data.expiration);
        this.router.navigate([""])
      },responseError=>{
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Form is invalid","Invalid")
    }
  }
  
  get email() { return this.loginForm.get('email')}
}
