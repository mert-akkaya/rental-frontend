import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css']
})
export class ProfileCompanyComponent implements OnInit {

 customerUpdateForm:FormGroup
 userId:number;
 customer:Customer

  constructor(private formBuilder:FormBuilder,private userService:UserService,private customerService:CustomerService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
   
    this.getUserId();
    this.getCustomerByUserId();
    this.createCustomerUpdateForm();
    
  }
  getUserId(){
    this.userId= this.userService.getUserId();
    }

  getCustomerByUserId(){
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{
      this.customer = response.data
    })
  }
  createCustomerUpdateForm(){
    this.customerUpdateForm = this.formBuilder.group({
      id:this.customer,
      userId:this.userId,
      companyName:["",Validators.required],
      findexPoint:this.customer
    })
    console.log(this.customerUpdateForm.value)
    
  }


  

 updateCustomer(){
    if (this.customerUpdateForm.valid) {
      this.customerUpdateForm.value.id=this.customer.id
       this.customerUpdateForm.value.findexPoint = this.customer.findexPoint
      let updateModel = Object.assign(this.customerUpdateForm.value);
      this.customerService.updateCustomer(updateModel).subscribe(response=>{
        this.toastrService.success("Company Name Updated","Success");
      },responseError=>{
        this.toastrService.error(responseError.error.message);
      })
    }else{
      this.toastrService.error("Form is invalid","Invalid")
    }
  }




}
