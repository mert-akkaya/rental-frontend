import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from 'src/environments/environment';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { User } from '../models/user';
import { UserForProfile } from '../models/userForProfile';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  token = this.localStorageService.get("Token");

  constructor(private httpClient:HttpClient,private localStorageService:LocalStorageService) { }

  getByMail(email:string):Observable<ItemResponseModel<User>>{
    return this.httpClient.get<ItemResponseModel<User>>(environment.apiUrl+"users/getbymail");
  }

  
  getById(id:number):Observable<ItemResponseModel<User>>{
    let newPath = environment.apiUrl+ "users/getbyıd?userId=" + id;
    return this.httpClient.get<ItemResponseModel<User>>(newPath);
  }
  getUserId(){
    let userId = parseInt(this.jwtHelper.decodeToken(this.token.toString())["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
    return userId;
  }
  updateForProfile(userForUpdateModel:UserForProfile):Observable<ItemResponseModel<UserForProfile>>{
    return this.httpClient.post<ItemResponseModel<UserForProfile>>(environment.apiUrl+"users/updateforprofile",userForUpdateModel);
  }


} 
