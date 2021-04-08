import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customer-detail';
import { Payment } from 'src/app/models/payment';
import { Rental } from 'src/app/models/rental';
import { CreditCart } from 'src/app/models/creditCart';
import { CarService } from 'src/app/services/car.service';
import { CreditCartService } from 'src/app/services/credit-cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SavedCreditCartService } from 'src/app/services/saved-credit-cart.service';
import { SavedCreditCart } from 'src/app/models/savedCreditCart';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService:PaymentService,private activatedRoute:ActivatedRoute,private router:Router,
    private carService:CarService,private customerService:CustomerService,private toastrService:ToastrService,private creditCartService:CreditCartService,private savedCreditCartService : SavedCreditCartService) { }
  payments:Payment[]=[];
  rental:Rental;
  cars:Car[];
  cartNumber:string
  cvv:string
  customer:CustomerDetail
  cartOwnerName:string
  lastUsingDate:string
  isSave:boolean=false
  creditCart:CreditCart

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

  saveCartAndPay(){
    let mounth=this.lastUsingDate.substring(0,2)
    let year=this.lastUsingDate.substring(2,4)
    let newDate = mounth.concat("/",year) 
    let creditCart :CreditCart={
      customerId:this.rental.customerId,
      cartNumber:this.cartNumber,
      cartCvv:parseInt(this.cvv),
      cartOwnerName:this.cartOwnerName,
      cartDate:newDate
    }
    this.creditCartService.save(creditCart).subscribe(response=>{
      if (response.success) {
        this.creditCartService.find(creditCart.cartNumber).subscribe(response=>{
          this.creditCart = response.data 
          let payment :Payment={
            customerId:this.rental.customerId,
            cartId:this.creditCart.id,
            price:this.rental.totalPrice
          }
          if (this.isSave==true) {
            let savedCreditCart:SavedCreditCart={
              customerId:this.rental.customerId,
              cartId:this.creditCart.id
            }
            this.savedCreditCartService.save(savedCreditCart).subscribe(response=>{
              if (response.success) {
                this.toastrService.success("Card Saved")
              }
            })
          }
          this.paymentService.addPayment(payment).subscribe(response=>{
            if (response.success) {
              this.toastrService.success("Pay success","Pay")
              this.router.navigate(['']);
            }
          })
        })
       
      }
    })
  }


//   addPayment(){
//       this.paymentService.addPayment(payment).subscribe(response=>{
//       if (response.success) {
//         this.toastrService.success("Pay success","Pay")
//         console.log("ödendi")
//         this.customerService.getCustomerById(payment.customerId).subscribe(response=>{
//           console.log(response.data.companyName)
//         })
//         // this.router.navigate(['']);
//       }
//     })
// }
}