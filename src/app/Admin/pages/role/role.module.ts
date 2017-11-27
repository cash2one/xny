import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RoleComponent } from './role.component';

import { roleRoutes } from './role.routes';
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { DirectiveModule } from '../../../Public/directives/directive.module'

import { RoleManagementModule } from './role-management/role-management.module'
import { RoleMainModule } from './role-main/role-main.module';

@NgModule({
  imports: [
    CommonModule,
    RoleMainModule,
    FormsModule,
    RoleManagementModule,
    RiccioBreadcrumbModule,
    roleRoutes,
    DirectiveModule
  ],
  exports: [
    RoleComponent
  ],
  declarations: [
    RoleComponent
  ]
})
export class RoleModule { }
