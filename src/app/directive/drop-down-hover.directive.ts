import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropDownHover]'
})
export class DropDownHoverDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#39b4bc','#fff');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('#fff','#000');
  }

  private highlight(bgcolor: string,color: string) {
    this.el.nativeElement.style.backgroundColor = bgcolor;
    this.el.nativeElement.style.color = color;
  }

}
