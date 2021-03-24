import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validator, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  errorMessages:string[]=[];
  brands:Brand[]
  constructor(private formBuilder:FormBuilder,private brandService:BrandService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      brandName:["",Validators.required]
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }
  

  update(){
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({},this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success("Brand Updated","Success");
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error")
            this.errorMessages = responseError.error.ValidationErrors[i].ErrorMessage
            console.log(this.errorMessages)
          }
        }
      })
    }else{
      this.toastrService.error("Form is invalid","Invalid")
    }
  }
}
