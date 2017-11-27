import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'

import { ShowDetailModule } from '../../show-detail/show-detail.module'

import { RiccioPopUpRightModule } from '../../../Public/riccio-pop-up-right/riccio-pop-up-right.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioSelectMembersModule } from '../../../Public/riccio-select-members/riccio-select-members.module'
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'
import { MembersComponent } from './members.component'
import { membersRoutes } from './members.routes'
import { RiccioTreeModule } from '../../../Public/riccio-tree/riccio-tree.module'
import { MembersAppComponent } from './members-app/members-app.component'

import { DepartmentCreateModule } from './department-create/department-create.module'
import { MembersSetDepartmentMainModule } from './members-set-department-main/members-set-department-main.module'
import { MembersSetAdminModule } from './members-set-admin/members-set-admin.module'

import { MembersMainModule } from './members-main/members-main.module'
import { MembersDisableModule } from './members-disable/members-disable.module'
import { MembersDepartmentModule } from './members-department/members-department.module'

import { MembersOpService } from './membersOp.service'
import { MembersService } from './members.service'
import {RiccioSingleMembersModule} from "../../../Public/riccio-single-members/riccio-single-members.module";

@NgModule({
  imports: [
    CommonModule,
    membersRoutes,
    FormsModule,
    ShowDetailModule,
    RiccioPopUpRightModule,
    RiccioTreeModule,
    RiccioModalModule,
    RiccioPaginationsModule,
    RiccioBreadcrumbModule,
    RiccioSingleMembersModule,
    MyLoadingModule,
    DepartmentCreateModule,
    MembersSetDepartmentMainModule,
    MembersSetAdminModule,
    RiccioPboxModule,
    RiccioSelectMembersModule,
    MembersMainModule,
    MembersDisableModule,
    MembersDepartmentModule
  ],
  exports:[
    MembersComponent
  ],
  declarations: [
    MembersComponent,
    MembersAppComponent
  ],
  providers:[
    MembersOpService,
    MembersService
  ]
})
export class MemberModule { }
