import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { CompanyEditAddComponent } from './company-edit-add.component';

import { RiccioDisabledbuttonModule }		from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioPboxModule }		from '../../../../Public/riccio-pbox/riccio-pbox.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule,
    RiccioPboxModule
  ],
  exports:[
  	CompanyEditAddComponent
  ],
  declarations: [CompanyEditAddComponent]
})
export class CompanyEditAddModule { }
