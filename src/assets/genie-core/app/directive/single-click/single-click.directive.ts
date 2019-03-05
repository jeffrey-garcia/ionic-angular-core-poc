import { Directive, HostBinding, HostListener, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[singleClick]'
})
export class SingleClickDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
  ) { 
  }

  @HostListener('click', ['$event'])
  clickEvent(event:any) {
    this.renderer.setElementStyle(this.el.nativeElement, 'pointer-events', 'none');
    setTimeout(() => {
      this.renderer.setElementStyle(this.el.nativeElement, 'pointer-events', 'auto');
    }, 800);
  }

  @HostListener('reset') onReset() { 
    this.renderer.setElementStyle(this.el.nativeElement, 'pointer-events', 'auto');
  }
}
