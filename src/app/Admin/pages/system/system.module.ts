import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SystemComponent } from './system.component';
import { systemRoutes } from './system.routes';


import { SystemService } from './system.service'

import { MenuComponent } from './menu/menu.component'
import { MenuAddModule } from './menu/menu-add/menu-add.module'
import { AddToModule } from './menu/add-to/add-to.module'

import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'
import { ShowDetailModule } from '../../show-detail/show-detail.module'
import { RiccioNotificationsModule } from '../../../Public/riccio-notifications/riccio-notifications.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { DirectiveModule } from '../../../Public/directives/directive.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    systemRoutes,
    MenuAddModule,
    AddToModule,
    MyLoadingModule,
    ShowDetailModule,
    RiccioNotificationsModule,
    RiccioPaginationsModule,
    RiccioModalModule,
    RiccioBreadcrumbModule,
    DirectiveModule
  ],
  exports:[
    SystemComponent
  ],
  declarations: [
    SystemComponent,
    MenuComponent
  ],
  providers: [
    SystemService
  ]
})
export class SystemModule { }
