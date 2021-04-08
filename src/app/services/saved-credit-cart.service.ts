import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';
import { SavedCreditCart } from '../models/savedCreditCart';

@Injectable({
  providedIn: 'root'
})
export class SavedCreditCartService {

  constructor(private httpClient:HttpClient) { }

  save(creditCart:SavedCreditCart):Observable<ResponseModel>{
    let newPath = environment.apiUrl+"savedcreditcarts/add"
   return this.httpClient.post<ResponseModel>(newPath,creditCart);
  }
}
