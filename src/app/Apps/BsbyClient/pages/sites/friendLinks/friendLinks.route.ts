import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { FriendLinksComponent } from './friendLinks.component'
import { FriendLinkListComponent } from './friendLink-list/friendLink-list.component'

export const routes=[
	{
		path:'',
		component:FriendLinksComponent,
		children:[
			{
				path:'',
				redirectTo:'list',
				pathMatch:'full'
			},
			{
				path:'list',
				component:FriendLinkListComponent
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
export class FriendLinksRouteModule{}