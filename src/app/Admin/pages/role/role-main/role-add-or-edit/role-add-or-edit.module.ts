import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RiccioDisabledbuttonModule }		from '../../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RoleAddOrEditComponent }		from './role-add-or-edit.component'

@NgModule({
  imports: [
    CommonModule,
    RiccioDisabledbuttonModule,
    FormsModule
  ],
  exports:[
  	RoleAddOrEditComponent
  ],
  declarations: [
  	RoleAddOrEditComponent
  ]
})
export class RoleAddOrEditModule { }
