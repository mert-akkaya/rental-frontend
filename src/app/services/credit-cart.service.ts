import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ResponseModel } from '../models/responseModel';
import { CreditCart } from '../models/creditCart';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCartService {

  constructor(private httpClient:HttpClient) { }

  save(creditCart:CreditCart):Observable<ResponseModel>{
    let newPath = environment.apiUrl+"creditcarts/add"
   return this.httpClient.post<ResponseModel>(newPath,creditCart);
  }

  find(cartNumber:string):Observable<ItemResponseModel<CreditCart>>{
    let newPath = environment.apiUrl+"creditcarts/getcartbycartnumber?cartNumber="+cartNumber
   return this.httpClient.post<ItemResponseModel<CreditCart>>(newPath,cartNumber);
  }

}
