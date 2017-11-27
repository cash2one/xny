import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersSetAdminComponent }		from './members-set-admin.component'
import { RiccioTreeDepartmentModule }		from '../../../../Public/riccio-tree-department/riccio-tree-department.module'

import { MembersSetAdminService }    from './members-set-admin.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioTreeDepartmentModule
  ],
  exports:[
  	MembersSetAdminComponent
  ],
  declarations: [
  	MembersSetAdminComponent
  ],
  providers:[
    MembersSetAdminService
  ]
})
export class MembersSetAdminModule { }
