import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JwtModule} from '@auth0/angular-jwt';
import { NgxMaskModule,IConfig} from 'ngx-mask';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { NaviComponent } from './components/navi/navi.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';


import {ToastrModule} from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfileMenuComponent } from './components/profile/profile-menu/profile-menu.component';
import { ProfileCompanyComponent } from './components/profile/profile-company/profile-company.component';
import { ProfileFindexComponent } from './components/profile/profile-findex/profile-findex.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { ProfileCreditCartComponent } from './components/profile/profile-credit-cart/profile-credit-cart.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ExpirationInterceptor } from './interceptors/expiration.interceptor';
import { ColorDirective } from './directives/color.directive';


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    NaviComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    CarFilterPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterComponent,
    PaymentComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileInfoComponent,
    ProfileMenuComponent,
    ProfileCompanyComponent,
    ProfileFindexComponent,
    ProfilePasswordComponent,
    ProfileCreditCartComponent,
    MainPageComponent,
    ColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    JwtModule,
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
   { provide:HTTP_INTERCEPTORS,useClass:ExpirationInterceptor,multi:true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
