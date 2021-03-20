import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  colors:Color[]=[]
  dataLoad=false;
  currentColor:Color;
  filterText:"";
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      if (response.success==true) {
        this.colors=response.data
         this.dataLoad=true;
      }
    })
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
    console.log(this.currentColor.colorName+" seçtiniz")
  }

  setCurrentColorClass(color:Color){
    if (color==this.currentColor) {
      return "list-group-item active"
    }else{
      return "list-group-item"
    }
  }

}
