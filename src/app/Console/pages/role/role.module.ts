import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RoleComponent } from './role.component';

import { roleRoutes }			from './role.routes';


import { RoleManagementModule }    from './role-management/role-management.module'
import { RoleMainModule }    from './role-main/role-main.module';

@NgModule({
  imports: [
    CommonModule,
    RoleMainModule,
    FormsModule,
    RoleManagementModule,
    roleRoutes
  ],
  exports:[
  	RoleComponent
  ],
  declarations: [
  	RoleComponent
  ]
})
export class RoleModule { }
