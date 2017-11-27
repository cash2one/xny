import {Directive, HostListener, HostBinding,ElementRef,Input,TemplateRef} from '@angular/core';

import { RiccioPopoversService }		from './riccio-popovers.service'

@Directive({
  selector: '[riccioPopovers]'
})
export class RiccioPopoversDirective {

  @Input() public riccioPopovers:any

  private timeout:any

  constructor(
  	private el:ElementRef,
  	private riccioPopoversService:RiccioPopoversService
  ) {
  }

  @HostListener('mouseenter', ['$event', 'true'])
  @HostListener('mouseleave', ['$event', 'false'])
  interactiveHandler(evt: Event, isEnter: boolean) {
    if(this.timeout) clearTimeout(this.timeout)
    let client = this.el.nativeElement.getBoundingClientRect()
    // if(this.riccioPopovers){
    //   this.riccioPopovers.setAttribute('class','popoverContent')
    // }

    let fnMove = ()=>{
      this.riccioPopoversService.setSubject({
        'client':client,
        'isShow':isEnter
      })

    }
    fnMove()
  }

}
