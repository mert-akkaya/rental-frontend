import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-findex',
  templateUrl: './profile-findex.component.html',
  styleUrls: ['./profile-findex.component.css']
})
export class ProfileFindexComponent implements OnInit {

  userId:number
  findexPoint:number
  constructor(private userService:UserService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getUserId();
    this.getCustomerByUserId();
  }

  getUserId(){
    this.userId= this.userService.getUserId();
    }

  getCustomerByUserId(){
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{
      this.findexPoint = response.data.findexPoint
    })
  }
}
