import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RuanwenAccountComponent } from './ruanwen-account.component';
import { AccountMainComponent } from './account-main/account-main.component';

import { ruanwenAccountRoutes }		from './ruanwen-account.routes'

import { RiccioPaginationsModule }		from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }		from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }		from '../../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioDatepickersModule }		from '../../../../Public/riccio-datepickers/riccio-datepickers.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    RiccioDatepickersModule,
    ruanwenAccountRoutes,
    RiccioPboxModule
  ],
  declarations: [RuanwenAccountComponent, AccountMainComponent]
})
export class RuanwenAccountModule { }
