import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'

import { SitesComponent } from './sites.component'
import { SiteListComponent } from './components/site-list/site-list.component'


export const routes:Routes=[
	{
		path:'',
		component:SitesComponent,
		children:[
			{ path: '', redirectTo: 'list/my', pathMatch: 'full' },
			{
				path:'list/:type',
				component:SiteListComponent
			},
			{
				path:'info',
				loadChildren:'../sites/siteInfo/siteInfo.module#SiteInfoModule'
			},
			{
				path:'keyword/:siteid',
				loadChildren:'../sites/keywords/keywords.module#KeywordsModule'
			},
			{
				path:'programme/:siteid',
				loadChildren:'../sites/programmes/programmes.module#ProgrammesModule'
			},
			{
				path:'demand/:siteid',
				loadChildren:'../sites/demands/demands.module#DemandsModule'
			},
			{
				path:'article/:siteid',
				loadChildren:'../sites/articles/articles.module#ArticlesModule'
			},
			{
				path:'friendLink/:siteid',
				loadChildren:'../sites/friendLinks/friendLinks.module#FriendLinksModule'
			},
			{
				path:'backLink/:siteid',
				loadChildren:'../sites/backLinks/backLinks.module#BackLinksModule'
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
export class SitesRouteModule{}