import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { CarImage } from '../models/car-image';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {

  
  apiUrl="https://localhost:44302/api/";
  constructor(private httpClient:HttpClient) { }

  getImagesById(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"carimages/getimagesbycarid?id="+carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getImages():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
