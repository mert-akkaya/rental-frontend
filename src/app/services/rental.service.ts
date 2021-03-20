import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { map, catchError } from 'rxjs/operators';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl="https://localhost:44302/api/rentals/"

  constructor(private httpClient:HttpClient) { }

  getRental():Observable<ListResponseModel<Rental>>{
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"getrentaldetail");
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath = this.apiUrl+"add";
    return this.httpClient.post<ResponseModel>(newPath,rental);
      
  }
}
