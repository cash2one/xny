import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import { RiccioModalModule }    from '../../../../Public/riccio-modal/riccio-modal.module';
import { MembersSetAdminModule }		from '../members-set-admin/members-set-admin.module'
import { MembersSetDepartmentMainModule }		from '../members-set-department-main/members-set-department-main.module'

import { MembersCreateModule }		from '../members-main/members-create/members-create.module'
import { MembersDepartmentComponent } from './members-department.component';
import { DepartmentNormalComponent } from './department-normal/department-normal.component';
import { DepartmentDisableComponent } from './department-disable/department-disable.component';

@NgModule({
  imports: [
    CommonModule,
    RiccioPboxModule,
    RiccioModalModule,
    MembersSetAdminModule,
    MembersSetDepartmentMainModule,
    FormsModule,
    MembersCreateModule
  ],
  declarations: [MembersDepartmentComponent, DepartmentNormalComponent, DepartmentDisableComponent]
})
export class MembersDepartmentModule { }
