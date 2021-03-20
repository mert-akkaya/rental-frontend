import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customer-detail';
import { ItemResponseModel } from '../models/itemResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44302/api/"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath= this.apiUrl+"customers/getall"
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"customers/getcustomerdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerDetailsById(id:number):Observable<ItemResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"customers/getcustomerdetailbyid?id="+id
    return this.httpClient.get<ItemResponseModel<CustomerDetail>>(newPath)
  }
}
