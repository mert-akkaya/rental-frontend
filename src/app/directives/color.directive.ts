import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  constructor(private el: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('red');
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.highlight('')
  }
  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }


}
