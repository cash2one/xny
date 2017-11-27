import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RoleMainComponent } from './role-main.component';
import { RoleAuthModule }    from '../role-auth/role-auth.module';

import { RiccioTreeModule }      from '../../../../Public/riccio-tree/riccio-tree.module';
import { RiccioPopUpRightModule }      from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.module';
import { RiccioModalModule }      from '../../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import { RiccioDisabledbuttonModule }    from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioSelectMembersModule } from '../../../../Public/riccio-select-members/riccio-select-members.module'

import { RoleSelectRoleModule }    from './role-select-role/role-select-role.module';
import { RoleDeleteComponent } from './role-delete/role-delete.component'
import { RiccioPaginationsModule }    from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { DirectiveModule } from '../../../../Public/directives/directive.module'

import { RoleAddOrEditModule }    from './role-add-or-edit/role-add-or-edit.module'

// import { MembersSetRoleModule }    from '../../../../Console/pages/members/members-set-role/members-set-role.module';
import { MembersSetRoleModule } from '../../members/members-set-role/members-set-role.module'
import { RoleDeleteUserlistComponent } from './role-delete-userlist/role-delete-userlist.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RoleAuthModule,
    RiccioTreeModule,
  	RiccioPopUpRightModule,
  	RiccioModalModule,
    RiccioDisabledbuttonModule,
  	RiccioPboxModule,
    RiccioPaginationsModule,
    MembersSetRoleModule,
    RoleAddOrEditModule,
    RoleSelectRoleModule,
    RiccioSelectMembersModule,
    DirectiveModule
  ],
  exports:[
  	RoleMainComponent
  ],
  declarations: [
  	RoleMainComponent,
  	RoleDeleteComponent,
  	RoleDeleteUserlistComponent
  ]
})
export class RoleMainModule { }
