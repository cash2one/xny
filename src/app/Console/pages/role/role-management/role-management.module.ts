import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';


import { RoleManagementComponent }		from './role-management.component'

import { RiccioPboxModule }    from '../../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioModalModule }		from '../../../../Public/riccio-modal/riccio-modal.module'

import { RoleSelectRoleModule }    from '../role-main/role-select-role/role-select-role.module'
import { RoleAddOrEditModule }		from '../role-main/role-add-or-edit/role-add-or-edit.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioModalModule,
    RiccioPboxModule,
    RoleAddOrEditModule,
    RoleSelectRoleModule,
    FormsModule
  ],
  exports:[
  	RoleManagementComponent
  ],
  declarations: [
  	RoleManagementComponent
  ]
})
export class RoleManagementModule { }
