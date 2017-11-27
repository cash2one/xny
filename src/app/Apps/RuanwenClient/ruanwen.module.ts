import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule }                from '@angular/router';

import { RuanwenService }    from './ruanwen.service'

import { RuanwenComponent } from './ruanwen.component';

import { ruanwenRoutes }		from './ruanwen.routes'

import { RuanwenOrderModule }		from './pages/ruanwen-order/ruanwen-order.module'
import { RuanwenMainModule }		from './pages/ruanwen-main/ruanwen-main.module'
import { RuanwenArticleModule }    from './pages/ruanwen-article/ruanwen-article.module'

import { RuanwenSecoundMenuModule }    from './common/ruanwen-secound-menu/ruanwen-secound-menu.module'
import { ServicesModule }		from './services/services.module'

import { RiccioPopoversModule }    from '@gr-public/riccio-popovers/riccio-popovers.module';
import { RiccioTopNavbarModule }    from '@gr-public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioPboxModule }    from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioAppLeftMenuModule } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.module'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ruanwenRoutes,
    RiccioPopoversModule,
    RiccioTopNavbarModule,
    RiccioPboxModule,
    RiccioAppLeftMenuModule,
    RuanwenSecoundMenuModule,
    RuanwenMainModule,
    RuanwenArticleModule,
    RuanwenOrderModule,
    ServicesModule.forRoot()
  ],
  declarations: [RuanwenComponent],
  providers:[
    RuanwenService
  ]
})
export class RuanwenModule { }
