import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'

import { SitesComponent } from './sites.component'
import { SiteListComponent } from './components/site-list/site-list.component'


export const routes:Routes=[
	{
		path:'',
		component:SitesComponent,
		children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path:'list',
				component:SiteListComponent
			},
			{
				path:'info',
				loadChildren:'./siteInfo/siteInfo.module#SiteInfoModule'
			},
			{
				path:'keyword/:siteid',
				loadChildren:'./keywords/keywords.module#KeywordsModule'
			},
			{
				path:'programme/:siteid',
				loadChildren:'./programmes/programmes.module#ProgrammesModule'
			},
			{
				path:'demand/:siteid',
				loadChildren:'./demands/demands.module#DemandsModule'
			},
			{
				path:'article/:siteid',
				loadChildren:'./articles/articles.module#ArticlesModule'
			},
			{
				path:'friendLink/:siteid',
				loadChildren:'./friendLinks/friendLinks.module#FriendLinksModule'
			},
			{
				path:'backLink/:siteid',
				loadChildren:'./backLinks/backLinks.module#BackLinksModule'
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