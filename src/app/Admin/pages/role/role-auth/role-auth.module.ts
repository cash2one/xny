import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleAuthComponent }		from './role-auth.component';
import { RoleAuthorityComponent } from './role-authority/role-authority.component';
import { RoleAuthorityViewComponent } from './role-authority/role-authority-view/role-authority-view.component'

import { RoleAuthService }			from './role-auth.service'

import { RiccioDisabledbuttonModule }    from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioDisabledbuttonModule
  ],
  exports:[
  	RoleAuthComponent
  ],
  declarations: [
  	RoleAuthComponent,
  	RoleAuthorityComponent,
  	RoleAuthorityViewComponent
  ],
  providers:[
  	RoleAuthService
  ]
})
export class RoleAuthModule { }
