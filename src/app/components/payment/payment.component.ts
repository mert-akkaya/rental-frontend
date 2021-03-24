import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customer-detail';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,private activatedRoute:ActivatedRoute,private router:Router,
    private carService:CarService,private customerService:CustomerService,private toastrService:ToastrService) { }
  payments:Payment[]=[];
  rental:Rental;
  cars:Car[];
  cartNumber:string
  cvv:number
  customer:CustomerDetail

  ngOnInit(): void {
   
    this.activatedRoute.params.subscribe(params=>{
      if(params["rental"]){
        this.rental = JSON.parse(params['rental']);
        this.getCar()
      }
    })
  }

  getCar(){
    this.carService.getCarsById(this.rental.carId).subscribe(response=>{
      this.cars=response.data;
    })
  }

  getCustomer(id:number){
    this.customerService.getCustomerDetailsById(id).subscribe(response=>{
     this.customer=response.data
    })
  }

  addPayment(){
    let payment :Payment={
      customerId:this.rental.customerId,
      cartNumber:this.cartNumber,
      cartCvv:this.cvv,
      price:this.rental.totalPrice
    };
    this.paymentService.addPayment(payment).subscribe(response=>{
      console.log(payment)
      if (response.success) {
        this.toastrService.success("Pay success","Pay")
        this.router.navigate(['']);
      }
    })
  }

}