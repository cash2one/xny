import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioPopDatePickerComponent } from './riccio-pop-datePicker.component'
import { RiccioPopDatePickerService } from './riccio-pop-datePicker.service'

import { RiccioDatepickersModule } from '../riccio-datepickers/riccio-datepickers.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioDatepickersModule
  ],
  exports:[
  	RiccioPopDatePickerComponent
  ],
  declarations: [
  	RiccioPopDatePickerComponent
  ],
  providers:[
    RiccioPopDatePickerService
  ]
})
export class RiccioPopDatePickerModule { }