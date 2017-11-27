import { RouterModule } from '@angular/router'

import { MessagesComponent } from './message.component'
import { MessageAllComponent } from './message-all/message-all.component'
import { MessageReadComponent } from './message-read/message-read.component'
import { MessageUnReadComponent } from './message-unread/message-unread.component'
import { MessageContentComponent } from './message-content/message-content.component'

import { MessageCommonComponent } from './message-common/message-common.component'

const routes = [
    {
        path: '',
        component: MessagesComponent,
        children: [
            { path: '', redirectTo: 'unread/list', pathMatch: 'full' },
            {
                path: 'all',
                component: MessageAllComponent,
                children:[
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path:'list',
                        component:MessageCommonComponent
                    },
                    {
                        path:'content/:id',
                        component:MessageContentComponent
                    }
                ]
            },
            {
                path:'read',
                component:MessageReadComponent,
                children:[
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path:'list',
                        component:MessageCommonComponent
                    },
                    {
                        path:'content/:id',
                        component:MessageContentComponent
                    }
                ]
            },
            {
                path:'unread',
                component:MessageUnReadComponent,
                children:[
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path:'list',
                        component:MessageCommonComponent
                    },
                    {
                        path:'content/:id',
                        component:MessageContentComponent
                    }
                ]
            }
        ]
    }

];

export const MessageRoutes = RouterModule.forChild(routes);
