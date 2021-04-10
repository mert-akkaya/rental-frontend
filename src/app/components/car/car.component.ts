import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { AuthService } from 'src/app/services/auth.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  dataLoad=false;
  carImageDefault:"https://localhost:44302//Images/logo.jpg";
  baseImagePath = environment.baseImageUrl;
  filterText:"";
  nullCar:boolean=false
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carDetailService:CarDetailService
    ,private toastrService:ToastrService,private authService:AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"] && params["colorId"]) {
        this.getCarByBrandAndColor(params["brandId"],params["colorId"])  
      }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      }else if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }
      else{
        this.getCars();
      }
    })
  }

  getCars(){
    this.carService.getCars().subscribe(response2=>{
      if (response2.success==true) {
        this.cars=response2.data;
        this.dataLoad=true;
      }
    })
  }

  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      if (response.success==true) {
        this.cars=response.data;
        this.dataLoad=true;
        this.nullCar=false
        if (this.cars.length<1) {
          this.nullCar=true
       }
      }
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      if (response.success==true) {
        this.cars=response.data;
        this.dataLoad=true;
        this.nullCar=false
        if (this.cars.length<1) {
          this.nullCar=true
       }
      }
    })
  }

  getCarByBrandAndColor(brandId:number,colorId:number){
    this.carService.getCarByBrandAndColor(brandId,colorId).subscribe(response=>{
      if (response.success==true) {
        this.cars=response.data;
        this.dataLoad=true;
        if(this.cars.length == 0){
          this.toastrService.info('There is no vehicle for search result.', 'Search Result');
        }
      }
    })
  }

  checkIfLogin(){
    if (this.authService.isAuthenticated()) {
      return true
    }else{
      return false
    }
  }
  
}
