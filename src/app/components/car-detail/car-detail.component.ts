import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  photos:CarImage[]=[]
  carDetail:Car[]=[];
  imageUrl="https://localhost:44302/";
  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute,private carService:CarService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarById(params["carId"])
        this.getImagesById(params["carId"])
        
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
}
