import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreditCart } from 'src/app/models/creditCart';
import { Customer } from 'src/app/models/customer';
import { SavedCreditCart } from 'src/app/models/savedCreditCart';
import { User } from 'src/app/models/user';
import { CustomerService } from 'src/app/services/customer.service';
import { SavedCreditCartService } from 'src/app/services/saved-credit-cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-credit-cart',
  templateUrl: './profile-credit-cart.component.html',
  styleUrls: ['./profile-credit-cart.component.css'],
})
export class ProfileCreditCartComponent implements OnInit {
  userId: number;
  user: User;
  customer:Customer;
  savedCreditCarts:CreditCart[]
  currentCreditCart:CreditCart
  constructor(
    private savedCreditCartService: SavedCreditCartService,
    private userService: UserService,private customerService:CustomerService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserId();
    this.getUserById();
    this.getCustomerByUserId();
  }

  getUserId() {
    this.userId = this.userService.getUserId();
  }


  getUserById() {
    this.userService.getById(this.userId).subscribe((response) => {
      this.user = response.data;
      this.getCustomerByUserId();
    });
  }

  getCustomerByUserId(){
    this.customerService.getCustomerByUserId(this.userId).subscribe(response=>{
      this.customer = response.data
      this.getSavedCreditCarts();
    })
    
  }
  getSavedCreditCarts(){
    this.savedCreditCartService.getSavedCreditCarts(this.customer.id).subscribe(response=>{
      this.savedCreditCarts = response.data
      console.log(this.savedCreditCarts)
    })
}
setCurrentCart(cart:CreditCart){
  this.currentCreditCart = cart
  console.log(this.currentCreditCart)
}
  deleteCart(){
    let deleteCartModel :SavedCreditCart={
      id:this.currentCreditCart.id,
      cartId:this.currentCreditCart.id,
      customerId:this.currentCreditCart.customerId
    }   
    this.savedCreditCartService.delete(deleteCartModel).subscribe(response=>{
      this.toastrService.success("Cart deleted","Info")
      window.location.reload();
    })
  }
}