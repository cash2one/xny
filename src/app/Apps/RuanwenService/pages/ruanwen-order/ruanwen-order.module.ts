import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenOrderComponent } from './ruanwen-order.component';

import { ruanwenOrderRoutes }		from './ruanwen-order.routes';
import { OrderListComponent } from './order-list/order-list.component'

import { RiccioPaginationsModule }		from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }    from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';

import { RuanwenListHeaderModule }		from '../../../RuanwenClient/common/ruanwen-list-header/ruanwen-list-header.module';

@NgModule({
  imports: [
    CommonModule,
    ruanwenOrderRoutes,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    RiccioPboxModule,
    RuanwenListHeaderModule
  ],
  exports:[
  	RuanwenOrderComponent
  ],
  declarations: [RuanwenOrderComponent, OrderListComponent]
})
export class RuanwenOrderModule { }
