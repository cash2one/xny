import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSelectRoleComponent } from './role-select-role.component';

import { RiccioTreeModule }		from '../../../../../Public/riccio-tree/riccio-tree.module'

import { RoleSelectRoleService }		from './role-select-role.service'

@NgModule({
  imports: [
    CommonModule,
    RiccioTreeModule
  ],
  exports:[
  	RoleSelectRoleComponent
  ],
  declarations: [RoleSelectRoleComponent],
  providers:[
  	RoleSelectRoleService
  ]
})
export class RoleSelectRoleModule { }
