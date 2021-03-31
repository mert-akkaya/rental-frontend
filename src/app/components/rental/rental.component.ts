import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customer-detail';
import { Rental } from 'src/app/models/rental';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentals:Rental[]=[]
  customerDetails:CustomerDetail[]
  customer:Customer
  customerId:number 
  dataLoad=false
  rentStartDate:Date;
  rentFinishDate:Date;
  isCustomer=true;
  @Input() car:Car;
  constructor(private rentalService:RentalService,private customerService:CustomerService,private toastrService:ToastrService
    ,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.getRental();
    this.getCustomerDetail();
    // this.getCustomerById();
    this.getcustomerByUserId();
  }

  getRental(){
    this.rentalService.getRental().subscribe(response=>{
      if (response.success==true) {
        this.rentals=response.data;
        this.dataLoad=true;
      }
    })
  }

  // getCustomerById(){
  //   if (this.customerId) {
  //     this.customerService.getCustomerById(this.customerId).subscribe(response=>{
  //       this.customer= response.data
  //     })
  //   }
    
  //}
  getcustomerByUserId(){
    let userId = this.authService.getUserId();
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
    this.customerId = response.data.id
    },responseError=>{
      this.isCustomer=false
     // this.toastrService.error("You are not customer pls go customer add page")
    })     
  }
  getCustomerDetail(){
    this.customerService.getCustomerDetails().subscribe(response=>{
      this.customerDetails=response.data
    })
  }


  addRental(){
    let rental : Rental={
      carId : this.car.carId,
      customerId:this.customerId,
      rentDate:this.rentStartDate,
      returnDate:this.rentFinishDate,
      totalPrice:this.calculatePrice() ,
    };
    this.rentalService.addRental(rental).subscribe(response=>{
      if (response.success==true) {
        this.toastrService.success("Rental added you are being redirected","Rental")
        this.router.navigate(['/payment',JSON.stringify(rental)]);
      }else if (this.isCustomer==false) {
        this.toastrService.error("You are not customer");
      }
      else{
         this.toastrService.error("Rental not added","Rental Error")
      }
    },responseError=>{
      console.log(responseError.error)
      this.toastrService.error(responseError.error.message,"Rental Error")
    });
  }

  calculatePrice(){
    if (this.rentStartDate && this.rentFinishDate) {
      let endDate = new Date(this.rentFinishDate.toString())
      let startDate = new Date(this.rentStartDate.toString())
      let endDay = Number.parseInt(endDate.getDate().toString())
      let endMonth = Number.parseInt(endDate.getMonth().toString())
      let endYear = Number.parseInt(endDate.getFullYear().toString())
      let startDay = Number.parseInt(startDate.getDate().toString())
      let startMonth = Number.parseInt(startDate.getMonth().toString())
      let startYear = Number.parseInt(startDate.getFullYear().toString())
      let result =  ((endDay - startDay) + ((endMonth - startMonth)*30) + ((endYear - startYear)*365) + 1) * this.car.dailyPrice
      if (result>0) {
        return result
      }
    } 
    return null
  }

  getRentMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  getReturnMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }
  getSelectedCustomer(customerId:number){
    if (this.customerId==customerId) {
      return true
    }
    else{
      return false
    }
  }

  setTotalPrice(finishDate:Date,startDate:Date){
    var timeDiff= finishDate.valueOf() - startDate.valueOf();//iki tarihin int farkı
    var result = Math.ceil(timeDiff/(1000))%60;
  
    console.log(timeDiff)
  return timeDiff
  }
  getInfo(){
    console.log(this.car.carId)
    console.log(this.customerId)
    console.log(this.rentStartDate)
    console.log(this.rentFinishDate)
  }
  
}
