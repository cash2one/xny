import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersComponent }    from './members.component'
import { membersRoutes }    from './members.routes'

import { MembersMainModule }    from './members-main/members-main.module'
import { MembersDisableModule }    from './members-disable/members-disable.module'
import { MembersDepartmentModule }    from './members-department/members-department.module'

@NgModule({
  imports: [
    CommonModule,
    membersRoutes,
    FormsModule,
    MembersMainModule,
    MembersDisableModule,
    MembersDepartmentModule
  ],
  exports:[
  	MembersComponent
  ],
  declarations: [
  	MembersComponent
  ]
})
export class MembersModule { }
