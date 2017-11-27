import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { RuanwenListHeaderComponent } from './ruanwen-list-header.component';

import { DatapickersModule }		from '../../../../Public/DataPickers/datapickers.module'

import { RiccioPboxModule }		from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioDatepickersModule }		from '@gr-public/riccio-datepickers/riccio-datepickers.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDatepickersModule,
    RiccioPboxModule,
    DatapickersModule
  ],
  exports:[
  	RuanwenListHeaderComponent
  ],
  declarations: [RuanwenListHeaderComponent]
})
export class RuanwenListHeaderModule { }
