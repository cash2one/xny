import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UEditorModule } from 'ngx-ueditor'

import { ConfigComponent } from './config.component'

import { configRoutes }			from './config.routes'
import { ConfigMainComponent } from './config-main/config-main.component'
import { ConfigDriveComponent } from './config-main/config-drive/config-drive.component'
import { ConfigTemplateComponent } from './config-main/config-template/config-template.component'
import { MailDriveComponent } from './config-main/mail-drive/mail-drive.component'
import { MailTemplateComponent } from './config-main/mail-template/mail-template.component'
import { ConfigRuleComponent } from './config-main/config-rule/config-rule.component'
import { MailRuleComponent } from './config-main/mail-rule/mail-rule.component'

import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioLoadingModule } from '../../../Public/riccio-loading/riccio-loading.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { DirectiveModule } from '../../../Public/directives/directive.module'

import { ShowDetailModule } from '../../show-detail/show-detail.module'

import { ConfigMainService } from './config-main/config-main.service'
import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    configRoutes,
    RiccioModalModule,
    RiccioPboxModule,
    RiccioPaginationsModule,
    DirectiveModule,
    UEditorModule.forRoot({
        path: 'assets/ueditor/',
        options: {
            themePath: 'assets/ueditor/themes/'
        }
    }),
    ShowDetailModule,
    MyLoadingModule
  ],
  exports:[
      ConfigComponent
  ],
  declarations: [
    ConfigComponent, 
    ConfigMainComponent, 
    ConfigDriveComponent, 
    ConfigTemplateComponent, 
    MailDriveComponent, 
    MailTemplateComponent, 
    ConfigRuleComponent, 
    MailRuleComponent
  ],
  providers:[
    ConfigMainService
  ]
})
export class ConfigModule { }
