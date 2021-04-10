import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ExpirationInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,private localStorageService:LocalStorageService,private toastrService:ToastrService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenModel = this.localStorageService.get("Token");
    let expiration = this.localStorageService.get("Expiration");
    if (!tokenModel) {
      return next.handle(request)
    };

    let expirationDate = new Date(expiration);
    let date = new Date()

    if (Number(expirationDate)<=Number(date)) {
      this.localStorageService.delete("Token");
      this.localStorageService.delete("Expiration");
      this.toastrService.info("Your session has expired,please login again.")
      this.router.navigate(['/login'])
    }
    return next.handle(request);
  }
}
