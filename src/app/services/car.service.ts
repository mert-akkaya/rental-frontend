import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44302/api/";
  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsById(id:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetailbyıd?id="+id
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcarsbybranddetail?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl+"cars/getcarsbycolordetail?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}
