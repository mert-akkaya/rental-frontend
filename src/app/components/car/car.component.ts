import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
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
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      }else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
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
      }
    })
  }

  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      if (response.success==true) {
        this.cars=response.data;
        this.dataLoad=true;
      }
    })
  }

}
