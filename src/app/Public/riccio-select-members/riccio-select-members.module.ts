import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { RiccioTreeDepartmentModule }    from '../riccio-tree-department/riccio-tree-department.module'

import { RiccioSelectMembersComponent } from './riccio-select-members.component';

import { RiccioSelectMembersService }		from './riccio-select-members.service'

import { RiccioPopoversModule }    from '../riccio-popovers/riccio-popovers.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPopoversModule,
    RiccioTreeDepartmentModule
  ],
  exports:[
  	RiccioSelectMembersComponent
  ],
  declarations: [
  	RiccioSelectMembersComponent
  ],
  providers:[
  	RiccioSelectMembersService
  ]
})
export class RiccioSelectMembersModule { }
