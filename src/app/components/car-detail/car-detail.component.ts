import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerComponent } from '../customer/customer.component';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  photos:CarImage[]=[]
  carDetail:Car[]=[];
  imageUrl="https://localhost:44302/";
  customerId:number;
  isCustomer=true;
  message:string;
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute,private carService:CarService,
    private authService:AuthService,private customerService:CustomerService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarById(params["carId"])
        this.getImagesById(params["carId"])
        this.getcustomerByUserId(); 
      }
    })
    
  }

  getCarById(id:number){
      this.carService.getCarsById(id).subscribe(response=>{
        this.carDetail=response.data
      })
  }

  getImagesById(carId:number){
    this.carDetailService.getImagesById(carId).subscribe(response=>{
      if (response.success==true) {
        this.photos=response.data
      }
    })
  }

  getcustomerByUserId(){
    let userId = this.authService.getUserId();
    this.customerService.getCustomerByUserId(userId).subscribe(response=>{
    this.customerId = response.data.id
    },responseError=>{
      this.isCustomer=false
    })     
  }

  getRentalButtonClass(){
    if (this.isCustomer==true) {
      return "btn btn-primary"
    }else{
      this.message="Please click the button below"
      return "btn btn-primary disabled"
    }
  }
  // getUserId(){
  //   this.userId=  this.authService.getUserId()
  //    console.log(this.userId)
  //  }

  // addCustomer(){
  //     let customerModel = Object.assign({},this.userId,this.companyName)
  //     this.customerService.addCustomer(customerModel).subscribe(response=>{
  //       this.toastrService.success(response.message)
  //     })
  //}
}
