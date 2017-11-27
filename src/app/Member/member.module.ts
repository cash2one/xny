import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member.component';
import { FormsModule } from '@angular/forms';

import { RiccioLoadingModule } from '@gr-public/riccio-loading/riccio-loading.module'
import { RiccioModalModule } from '@gr-public/riccioModule';
import { RiccioDisabledbuttonModule } from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioTopNavbarModule } from '@gr-public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioPboxModule } from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioAppLeftMenuModule } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.module'

import { MemberService } from './member.service';
import { MemberPasswordComponent } from './member-password/member-password.component';
import { MemberComsComponent } from './member-companies/member-companies.component';
import { MemberSettingComponent } from './member-setting/member-setting.component';

import { MemberRouteModule } from './member.routes'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RiccioLoadingModule,
        RiccioModalModule,
        RiccioDisabledbuttonModule,
        RiccioTopNavbarModule,
        RiccioAppLeftMenuModule,
        RiccioPboxModule,
        MemberRouteModule
    ],
    exports: [
        MemberComponent
    ],
    declarations: [
        MemberComponent,
        MemberPasswordComponent,
        MemberComsComponent,
        MemberSettingComponent
    ],
    providers: [
        MemberService
    ]
})
export class MemberModule { }
