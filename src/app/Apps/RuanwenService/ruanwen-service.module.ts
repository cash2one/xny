import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';

import { RuanwenServiceComponent }		from './ruanwen-service.component'
import { ServicesModule }		from './services/services.module'

import { ruanwenServiceRoutes }		from './ruanwen-service.routes'

import { RuanwenSecoundMenuModule }		from '../RuanwenClient/common/ruanwen-secound-menu/ruanwen-secound-menu.module'
import { RiccioPopoversModule }		from '../../Public/riccio-popovers/riccio-popovers.module'

import { RuanwenArticleModule }		from './pages/ruanwen-article/ruanwen-article.module'
import { RuanwenCompanyModule }		from './pages/ruanwen-company/ruanwen-company.module'
import { RuanwenOrderModule }		from './pages/ruanwen-order/ruanwen-order.module'
import { RuanwenAccountModule }  from './pages/ruanwen-account/ruanwen-account.module'

import { RiccioTopNavbarModule }    from '../../Public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioPboxModule }    from '../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioAppLeftMenuModule } from '../../Public/riccip-app-left-menu/riccio-app-left-menu.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ruanwenServiceRoutes,
    RuanwenSecoundMenuModule,
    RiccioPopoversModule,
    ServicesModule.forRoot(),
    RuanwenArticleModule,
    RuanwenCompanyModule,
    RuanwenOrderModule,
    RuanwenAccountModule,
    RiccioTopNavbarModule,
    RiccioPboxModule,
    RiccioAppLeftMenuModule
  ],
  declarations: [
  	RuanwenServiceComponent
  ]
})
export class RuanwenServiceModule { }
