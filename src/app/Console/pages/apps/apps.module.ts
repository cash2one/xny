import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps.component';

import { appsRoutes }		from './apps.routes'

import { AppsMyModule }		from './apps-my/apps-my.module'
import { AppsMainModule }		from './apps-main/apps-main.module'

@NgModule({
  imports: [
    CommonModule,
    appsRoutes,
    AppsMyModule,
    AppsMainModule
  ],
  exports:[
  	AppsComponent
  ],
  declarations: [
  	AppsComponent
  ]
})
export class AppsModule { }
