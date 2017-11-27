import { NgModule } from '@angular/core'
import { Route, RouterModule } from '@angular/router'

import { IndexComponent } from './index.component'
const routes:Route[] = [
    {
        path:'',
        component:IndexComponent
    }
]

export const IndexRoutes = RouterModule.forChild(routes);