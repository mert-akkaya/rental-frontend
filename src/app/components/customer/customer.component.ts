import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms'

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerAddForm:FormGroup;
  constructor(private customerService:CustomerService,private authService:AuthService,private toastrService:ToastrService
    ,private formBuilder:FormBuilder) { }
  customers:Customer[]=[]
  dataLoad=false;
  userId?:number
  ngOnInit(): void {
    this.getCustomers();
    if (this.authService.isAuthenticated()) {
      this.getUserId();
    }
    this.createCustomerAddForm();
    
  }

  createCustomerAddForm(){
    this.customerAddForm= this.formBuilder.group({
      userId:this.userId,
      companyName:["",Validators.required]
    })
  }
  getCustomers(){
    this.customerService.getCustomers().subscribe(response=>{
      if (response.success==true) {
        this.customers=response.data
        this.dataLoad=true;
      }
    })
  }

  getUserId(){
   this.userId=  this.authService.getUserId()
  }
  addCustomer(){
    let customerModel = Object.assign({},this.customerAddForm.value)
    console.log(customerModel)
    this.customerService.addCustomer(customerModel).subscribe(response=>{
      this.toastrService.success(response.message)
      window.location.reload()
    })
  }

}
