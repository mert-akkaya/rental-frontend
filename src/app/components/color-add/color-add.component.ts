import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  errorMessages:string[]=[]
  constructor(private formBuilder:FormBuilder,private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    });
  }

  add(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({},this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success("Color Added","Info");
      },responseError=>{
        if (responseError.error.ValidationErrors.length>0) {
          console.log(responseError)
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Validation Error");
            this.errorMessages[i] = responseError.error.ValidationErrors[i].ErrorMessage
           
          }
           console.log(this.errorMessages)
        }
      })
    }
    else{
      this.toastrService.error("Form is invalid ","Invalid")
    }
  }
}
