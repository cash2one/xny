import { NgModule } from '@angular/core'
import { Route,RouterModule } from '@angular/router'

import { MemberComsComponent } from './member-companies/member-companies.component'
import { MemberSettingComponent } from './member-setting/member-setting.component'
import { MemberPasswordComponent } from './member-password/member-password.component'
import { MemberComponent } from './member.component'

import { GrMembersService } from '../ApiServices/grMembers/grMembers.service'

const routes:Route[] = [
    {
        path:'',
        resolve: { 
            info:GrMembersService 
        },
        component:MemberComponent,
        children:[
            {
                path:'',
                redirectTo:'setting',
                pathMatch:'full'
            },
            {
                path:'setting',
                component:MemberSettingComponent
            },
            {
                path:'companies',
                component:MemberComsComponent
            },
            {
                path:'password',
                component:MemberPasswordComponent
            }
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class MemberRouteModule{}