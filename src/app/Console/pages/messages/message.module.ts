import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioDatepickersModule } from '../../../Public/riccio-datepickers/riccio-datepickers.module'
import { RiccioPopUpRightModule } from '../../../Public/riccio-pop-up-right/riccio-pop-up-right.module'

import { MessagesComponent } from './message.component'
import { MessageRoutes } from './message.route'
import { MessageAllComponent } from './message-all/message-all.component'
import { MessageReadComponent } from './message-read/message-read.component'
import { MessageUnReadComponent } from './message-unread/message-unread.component'
import { MessageContentComponent } from './message-content/message-content.component'
import { MessageCommonComponent } from './message-common/message-common.component'

import { MessageService } from './message.service';

@NgModule({
    imports: [
        CommonModule,
        MessageRoutes,
        RiccioPaginationsModule,
        RiccioSpinnersModule,
        FormsModule,
        ReactiveFormsModule,
        RiccioModalModule,
        RiccioDatepickersModule,
        RiccioPopUpRightModule
    ],
    declarations: [
        MessagesComponent,
        MessageAllComponent,
        MessageReadComponent,
        MessageUnReadComponent,
        MessageContentComponent,
        MessageCommonComponent
    ],
    providers:[
        MessageService
    ]
})
export class MessageModule { }
