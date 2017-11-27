import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProcessComponent } from './order-process.component';

import { RuanwenWriteOrderModule } 		from '../../../common/ruanwen-write-order/ruanwen-write-order.module'
import { ReleaseTopNavbarModule }		from '../../../common/release-top-navbar/release-top-navbar.module'
import { ReleasePathNavbarModule }			from '../../../common/release-path-navbar/release-path-navbar.module'
import { OrderWriteInfoModule }    from '../../../common/order-write-info/order-write-info.module'
import { OrderWriteRuanwenListModule }    from '../../../common/order-write-ruanwen-list/order-write-ruanwen-list.module'
import { OrderWriteRuanwenInfoModule }    from '../../../common/order-write-ruanwen-info/order-write-ruanwen-info.module'
import { RiccioModalModule }    from '@gr-public/riccio-modal/riccio-modal.module'
  
import { WriteSubmitComponent } from './write-submit/write-submit.component';
import { WriteConfirmComponent } from './write-confirm/write-confirm.component';
import { WriteRejectComponent } from './write-reject/write-reject.component';
import { WriteWritingComponent } from './write-writing/write-writing.component';
import { WriteCompleteComponent } from './write-complete/write-complete.component'      

import { orderProcessRoutes }		from './order-process.routes'
import { OrderProcessService }    from './order-process.service'

@NgModule({
  imports: [
    CommonModule,
    orderProcessRoutes,
    ReleaseTopNavbarModule,
    OrderWriteInfoModule,
    RiccioModalModule,
    ReleasePathNavbarModule,
    OrderWriteRuanwenInfoModule,
    OrderWriteRuanwenListModule,
    RuanwenWriteOrderModule
  ],
  exports:[
  	OrderProcessComponent
  ],
  declarations: [
  	OrderProcessComponent,
  	WriteSubmitComponent,
  	WriteConfirmComponent,
  	WriteRejectComponent,
  	WriteWritingComponent,
  	WriteCompleteComponent
  ],
  providers:[
    OrderProcessService
  ]
})
export class OrderProcessModule { }
