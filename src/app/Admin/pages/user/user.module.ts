import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { UserComponent } from './user.component'
import { userRoutes } from './user.routes';
import { UserMainComponent } from './user-main/user-main.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserOpComponent } from './user-op/user-op.component'

import { AdminUserAddModule } from './user-admin-add/user-admin-add.module'
import { ShowDetailModule } from '../../show-detail/show-detail.module'
import { RiccioNotificationsModule } from '../../../Public/riccio-notifications/riccio-notifications.module'
import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'
import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSelectMembersModule } from '../../../Public/riccio-select-members/riccio-select-members.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { DirectiveModule } from '../../../Public/directives/directive.module'

import { UserOpService } from './user-op/user-op.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    userRoutes,
    ShowDetailModule,
    RiccioNotificationsModule,
    MyLoadingModule,
    RiccioPaginationsModule,
    RiccioModalModule,
    RiccioSelectMembersModule,
    AdminUserAddModule,
    RiccioPboxModule,
    RiccioBreadcrumbModule,
    DirectiveModule
  ],
  exports:[
    UserComponent
  ],
  declarations: [
    UserComponent,
    UserMainComponent,
    UserDetailsComponent,
    UserOpComponent
  ],
  providers: [
    UserOpService
  ]
})
export class UserModule { }
