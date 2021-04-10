import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileCompanyComponent } from './components/profile/profile-company/profile-company.component';
import { ProfileCreditCartComponent } from './components/profile/profile-credit-cart/profile-credit-cart.component';
import { ProfileFindexComponent } from './components/profile/profile-findex/profile-findex.component';
import { ProfileInfoComponent } from './components/profile/profile-info/profile-info.component';
import { ProfilePasswordComponent } from './components/profile/profile-password/profile-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:MainPageComponent},
  {path:"cars",component:CarComponent,canActivate:[LoginGuard]},
  {path:"brands",component:BrandComponent,canActivate:[LoginGuard]},
  {path:"colors",component:ColorComponent,canActivate:[LoginGuard]},
  {path:"brand/:brandId",component:CarComponent,canActivate:[LoginGuard]},
  {path:"color/:colorId",component:CarComponent,canActivate:[LoginGuard]},
  {path:"car-detail/:carId",component:CarDetailComponent,canActivate:[LoginGuard]},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent,canActivate:[LoginGuard]},
  {path:"rental",component:RentalComponent,canActivate:[LoginGuard]},
  {path:"payment/:rental",component:PaymentComponent,canActivate:[LoginGuard]},
  {path:"brands/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"colors/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brands/update",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/update",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent,canActivate:[LoginGuard],children: [
    {path:"info", component: ProfileInfoComponent},
    {path:"company",component:ProfileCompanyComponent},
    {path:"findex",component:ProfileFindexComponent},
    {path:"password",component:ProfilePasswordComponent},
    {path:"my-carts",component:ProfileCreditCartComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
