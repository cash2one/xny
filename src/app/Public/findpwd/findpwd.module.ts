import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { FindpwdService }		from './findpwd.service'
import { FindpwdComponent } from './findpwd.component';

import { RiccioDisabledbuttonModule }		from '../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioModalModule }    from '../../Public/riccio-modal/riccio-modal.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioModalModule,
    RiccioDisabledbuttonModule
  ],
  exports:[
  	FindpwdComponent
  ],
  declarations: [FindpwdComponent],
  providers: [
  	FindpwdService
  ]
})
export class FindpwdModule { }
