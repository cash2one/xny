import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { CompanyChargeComponent }		from './company-charge.component'

import { CompanyChargeService }		from './company-charge.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	CompanyChargeComponent
  ],
  declarations: [
  	CompanyChargeComponent
  ],
  providers:[
  	CompanyChargeService
  ]
})
export class CompanyChargeModule { }
