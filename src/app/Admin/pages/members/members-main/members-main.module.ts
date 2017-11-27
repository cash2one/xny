import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { RiccioPopUpRightModule } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.module'
import { RiccioPaginationsModule } from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioModalModule } from '../../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule } from '../../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioSelectMembersModule } from '../../../../Public/riccio-select-members/riccio-select-members.module'
import { MembersMainComponent } from './members-main.component'
import { RiccioTreeModule } from '../../../../Public/riccio-tree/riccio-tree.module'
import { DirectiveModule } from '../../../../Public/directives/directive.module'

import { DepartmentCreateModule } from '../department-create/department-create.module'
import { MembersSetDepartmentMainModule } from '../members-set-department-main/members-set-department-main.module'
import { MembersSetAdminModule } from '../members-set-admin/members-set-admin.module'
import { MembersSetDepartmentModule } from '../members-set-department/members-set-department.module'
import { MembersSetRoleModule } from '../members-set-role/members-set-role.module'
import { MembersAddModule } from '../members-add/members-add.module'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPopUpRightModule,
    RiccioTreeModule,
    RiccioModalModule,
    RiccioPaginationsModule,
    DepartmentCreateModule,
    MembersSetDepartmentMainModule,
    MembersSetAdminModule,
    RiccioPboxModule,
    DirectiveModule,
    RiccioSelectMembersModule,
    MembersSetDepartmentModule,
    MembersSetRoleModule,
    MembersAddModule,

  ],
  declarations: [MembersMainComponent]
})
export class MembersMainModule { }
