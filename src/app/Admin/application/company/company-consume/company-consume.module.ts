import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { CompanyConsumeComponent } from './company-consume.component'

import { RiccioDatepickersModule } from '../../../../Public/riccio-datepickers/riccio-datepickers.module'
import { RiccioPboxModule } from '../../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioPaginationsModule } from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPopDatePickerModule } from '../../../../Public/riccio-pop-datePicker/riccio-pop-datePicker.module'
import { DirectiveModule } from '../../../../Public/directives/directive.module'
import { ConsumeShowDetailModule } from '../consume-show-detail/consume-show-detail.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDatepickersModule,
    RiccioPboxModule,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    RiccioPopDatePickerModule,
    ConsumeShowDetailModule,
    DirectiveModule
  ],
  exports:[
    CompanyConsumeComponent
  ],
  declarations: [
    CompanyConsumeComponent
  ]
})
export class CompanyConsumeModule { }
