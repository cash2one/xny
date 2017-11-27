import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioPopoversDirective } from './riccio-popovers.directive';
import { RiccioPopoversComponent }    from './riccio-popovers.component'

import { RiccioPopoversService }		from './riccio-popovers.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioPopoversDirective,
    RiccioPopoversComponent
  ],
  declarations: [
  	RiccioPopoversDirective,
    RiccioPopoversComponent
  ],
  providers:[
  	RiccioPopoversService
  ]
})
export class RiccioPopoversModule { }
