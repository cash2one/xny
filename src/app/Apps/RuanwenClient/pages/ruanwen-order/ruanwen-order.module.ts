import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';

import { RuanwenOrderComponent } from './ruanwen-order.component';

import { ruanwenOrderRoutes }		from './ruanwen-order.routes'

import { RuanwenListHeaderModule }		from '../../common/ruanwen-list-header/ruanwen-list-header.module'
import { RiccioPaginationsModule }		from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }    from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }      from '@gr-public/riccio-pbox/riccio-pbox.module';
import { RuanwenWriteOrderModule }    from '../../common/ruanwen-write-order/ruanwen-write-order.module'
import { OrderProcessModule }    from './order-process/order-process.module'

import { OrderListModule }      from './order-list/order-list.module'
import { OrderWriteModule }    from './order-write/order-write.module'

@NgModule({
  imports: [
    CommonModule,
    ruanwenOrderRoutes,
    RiccioSpinnersModule,
    RuanwenListHeaderModule,
    RiccioPaginationsModule,
    OrderWriteModule,
    OrderProcessModule,
    RiccioPboxModule,
    RuanwenWriteOrderModule,
    OrderListModule
  ],
  exports:[
  	RuanwenOrderComponent
  ],
  declarations: [
  	RuanwenOrderComponent
  ]
})
export class RuanwenOrderModule { }
