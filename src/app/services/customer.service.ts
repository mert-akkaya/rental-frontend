import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { CustomerDetail } from '../models/customer-detail';
import { ItemResponseModel } from '../models/itemResponseModel';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

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
  getCustomerById(customerId:number):Observable<ItemResponseModel<Customer>>{
    let newPath = environment.apiUrl+"customers/get?customerId="+customerId;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }
  getCustomerByUserId(userId:number):Observable<ItemResponseModel<Customer>>{
    let newPath = environment.apiUrl+"customers/getcustomerbyuserid?userId="+userId;
    return this.httpClient.get<ItemResponseModel<Customer>>(newPath);
  }

  getCustomerDetails():Observable<ListResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"customers/getcustomerdetail"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath)
  }

  getCustomerDetailsById(id:number):Observable<ItemResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl+"customers/getcustomerdetailbyid?id="+id
    return this.httpClient.get<ItemResponseModel<CustomerDetail>>(newPath)
  }

  addCustomer(customer:Customer):Observable<ResponseModel>{
    let newPath= environment.apiUrl+"customers/add";
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }
}
