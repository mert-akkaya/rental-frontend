import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  errorMessages:string[]=[];
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddFrom();
  }
 
   createBrandAddFrom(){
     this.brandAddForm = this.formBuilder.group({
      brandName:["",Validators.required]
    });
   }
   add(){
     if (this.brandAddForm.valid) {
       let brandModel = Object.assign({},this.brandAddForm.value);
       this.brandService.add(brandModel).subscribe(response=>{
         this.toastrService.success("Brand added","Info")
       },responseError=>{
         if (responseError.error.ValidationErrors.length>0) {
           for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
             this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
             this.errorMessages = responseError.error.ValidationErrors[i].ErrorMessage
           }
         }
       })
     }else{
      this.toastrService.error("Form is invalid","Form")
    }
   }

}
