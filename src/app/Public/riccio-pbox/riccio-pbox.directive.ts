import { Directive,ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[RiccioPboxBlur]'
})
export class RiccioPboxDirective {

  constructor(el:ElementRef) { 
  }

}
