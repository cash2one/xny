import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { NglModule } from 'ng-lightning/ng-lightning';

import { RiccioDatepickersComponent } from './riccio-datepickers.component';
import { SelectTimeComponent } from './select-time/select-time.component';
import { SelectYearComponent } from './select-year/select-year.component';
import { SelectMonthComponent } from './select-month/select-month.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NglModule.forRoot({
      // svgPath:"assets/icons/utility-sprite/svg/symbols.svg"
      svgPath:"assets/icons/"
    })
  ],
  exports:[
  	RiccioDatepickersComponent
  ],
  declarations: [
  	RiccioDatepickersComponent,
  	SelectTimeComponent,
  	SelectYearComponent,
  	SelectMonthComponent
  ]
})
export class RiccioDatepickersModule { }
