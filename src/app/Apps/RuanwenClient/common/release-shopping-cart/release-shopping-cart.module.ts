import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseShoppingCartComponent } from './release-shopping-cart.component';

import { RiccioSpinnersModule }		from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioDisabledbuttonModule }		from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'

import { ReleaseShoppingCartServices }	  from './release-shopping-cart.services'

@NgModule({
  imports: [
    CommonModule,
    RiccioSpinnersModule,
    RiccioDisabledbuttonModule
  ],
  exports:[
  	ReleaseShoppingCartComponent
  ],
  declarations: [ReleaseShoppingCartComponent],
  providers:[
  	ReleaseShoppingCartServices
  ]
})
export class ReleaseShoppingCartModule { }
