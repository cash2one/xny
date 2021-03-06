import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RuanwenListHeaderModule }    from '../../../common/ruanwen-list-header/ruanwen-list-header.module'
import { RiccioPaginationsModule }    from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }    from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }      from '@gr-public/riccio-pbox/riccio-pbox.module';
import { RuanwenWriteOrderModule }    from '../../../common/ruanwen-write-order/ruanwen-write-order.module'

import { OrderWriteComponent }    from './order-write.component'

@NgModule({
  imports: [
    CommonModule,
    RiccioSpinnersModule,
    RuanwenListHeaderModule,
    RiccioPaginationsModule,
    RiccioPboxModule,
    RuanwenWriteOrderModule
  ],
  exports:[
    OrderWriteComponent
  ],
  declarations: [
    OrderWriteComponent
  ]
})
export class OrderWriteModule { }
