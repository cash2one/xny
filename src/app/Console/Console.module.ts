import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { RouterModule }                from '@angular/router';
import { FormsModule }                 from '@angular/forms';
import { BrowserAnimationsModule }     from '@angular/platform-browser/animations';

import { RiccioTopNavbarModule }       from '../Public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioPboxModule }            from '../Public/riccio-pbox/riccio-pbox.module' 
import { RiccioSelectMembersModule }   from '../Public/riccio-select-members/riccio-select-members.module'
import { RiccioPopoversModule }        from '../Public/riccio-popovers/riccio-popovers.module'
import { RiccioAppLeftMenuModule } from '../Public/riccip-app-left-menu/riccio-app-left-menu.module'

import { ServicesModule }              from './services/services.module';

import { ConsoleComponent }			       from './Console.component';
import { consoleRoutes }               from './Console.routes';
import { SecoundMenuComponent }        from './common/secound-menu/secound-menu.component';
import { TopMenuComponent }            from './common/top-menu/top-menu.component'

import { ConsolesService }             from './Console.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    consoleRoutes,
    RiccioPboxModule,
    RiccioPopoversModule,
    RiccioTopNavbarModule,
    RiccioSelectMembersModule,
    RiccioAppLeftMenuModule,
    ServicesModule.forRoot()
  ],
  declarations: [
  	ConsoleComponent,
  	SecoundMenuComponent,
  	TopMenuComponent
  ],
  providers:[
    ConsolesService
  ]
})
export class ConsoleModule { }
