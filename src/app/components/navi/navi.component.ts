import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  user:User 
  userId:number;
  isAuthenticated:boolean
  constructor(public authService:AuthService,private userService:UserService,private toastrService:ToastrService,
    private router:Router) {}

  ngOnInit(): void {
    if (this.checkIfLogin()) {
      this.getUserId();
      this.getUserById();
      
    }
  }

  checkIfLogin(){
    if (this.authService.isAuthenticated()) {
      return true
    }else{
      return false
    }
  }

  getUserId(){
   this.userId =  this.userService.getUserId()
  }

  getUserById() {
    this.userService.getById(this.userId).subscribe((response) => {
      this.user = response.data;
    });
  }
  
  logOut(){
    this.authService.logOut();
    this.toastrService.info("Log out success")
     this.router.navigate([""])
  }
  


}
