import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';


import { NglModule }                from 'ng-lightning/ng-lightning';

import { DatepickersComponent }		from './datepickers.component';
import { SelectYearComponent }		from './select-year/select-year.component';
import { SelectTimeComponent }		from './select-time/select-time.component';
import { SelectMonthComponent }		from './select-month/select-month.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NglModule.forRoot(),
  ],
  exports:[
  	DatepickersComponent,
  	SelectYearComponent,
  	SelectTimeComponent,
  	SelectMonthComponent
  ],
  declarations: [
  	DatepickersComponent,
  	SelectYearComponent,
  	SelectTimeComponent,
  	SelectMonthComponent
  ]
})
export class DatapickersModule { }
