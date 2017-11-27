import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RuanwenWriteOrderComponent } from './ruanwen-write-order.component';

import { RiccioModalModule }      from '@gr-public/riccio-modal/riccio-modal.module'
import { ActivityCodeModule }      from '../../pages/ruanwen-release/release-activity/activity-code/activity-code.module'
import { RiccioDisabledbuttonModule }    from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RuanwenNgxueditorModule }    from '../ruanwen-ngxueditor/ruanwen-ngxueditor.module'
import { RiccioPboxModule }      from '@gr-public/riccio-pbox/riccio-pbox.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioModalModule,
    RiccioPboxModule,
    RiccioDisabledbuttonModule,
    RuanwenNgxueditorModule,
    ActivityCodeModule
  ],
  exports:[
  	RuanwenWriteOrderComponent
  ],
  declarations: [RuanwenWriteOrderComponent]
})
export class RuanwenWriteOrderModule { }
