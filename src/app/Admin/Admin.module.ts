import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule }                from '@angular/router'

import { NglModule }    from 'ng-lightning/ng-lightning'

import { StoreModule } from   '@ngrx/store'

import { MyConfirmModule }    from '../Public/Animations/my-confirm/my-confirm.module'
import { MyElasticLayerModule } from '../Public/Animations/my-elastic-layer/my-elastic-layer.module'
import { RiccioSelectMembersModule }    from '../Public/riccio-select-members/riccio-select-members.module'
import { RiccioPboxModule } from '../Public/riccio-pbox/riccio-pbox.module'
import { RiccioNotificationsModule } from '../Public/riccio-notifications/riccio-notifications.module'
import { RiccioLoadingModule } from '../Public/riccio-loading/riccio-loading.module'

import { adminRoutes }    from './Admin.routes'
import { ServicesModule }    from './services/services.module'
import { AdminComponent }		from './Admin.component'
import { ErrorViewComponent } from './error-view/error-view.component'

import { AdminService } from './Admin.service'

// import { SystemModule } from './pages/system/system.module'
// import { ProjectModule } from './pages/project/project.module'
// import { RoleModule } from './pages/role/role.module'
// import { AppcenterModule } from './pages/appcenter/appcenter.module'
// import { ConfigModule } from './pages/config/config.module'
// import { AddoncenterModule } from './pages/addoncenter/addoncenter.module'
// import { MyPromptSmallModule } from '../Public/Animations/my-prompt-small/my-prompt-small.module'
// import { CompanyModule } from './application/company/company.module'
// import { UserModule } from './pages/user/user.module'
// import { MemberModule } from './pages/members/members.module'
// import { MemberModule }    from '../Member/member.module';

@NgModule({
  imports: [
    CommonModule,
    adminRoutes,
    RouterModule,
    NglModule.forRoot(),
    MyConfirmModule,
    MyElasticLayerModule,
    RiccioSelectMembersModule,
    RiccioPboxModule,
    RiccioNotificationsModule,
    RiccioLoadingModule,
    ServicesModule.forRoot(),
    StoreModule.provideStore({}),
    // MemberModule,

    // SystemModule,
    // ProjectModule,
    // RoleModule,
    // AppcenterModule,
    // ConfigModule,
    // AddoncenterModule,
    // MyPromptSmallModule,
    // CompanyModule,
    // UserModule,
    // MemberModule
  ],
  declarations: [
  	AdminComponent,
    ErrorViewComponent
  ],
  providers:[
    AdminService
  ]
})
export class AdminModule { }
