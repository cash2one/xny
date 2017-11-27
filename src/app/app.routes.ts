import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './Public/Login/Login.component';
import { RegisterComponent }	from './Public/register/register.component'	
import { FindpwdComponent }		from './Public/findpwd/findpwd.component'
import { ErrorComponent }		from './Error/error.component'


export const appRoutes=[
	{
		path:'login',
		component: LoginComponent
	},
	{
		path:'register',
		component: RegisterComponent
	},
	{
		path:'findpwd',
		component: FindpwdComponent
	},
    {
        path:'Member',
        loadChildren:'./Member/member.module#MemberModule'
    },
	{
		path:"Admin",
		loadChildren:'./Admin/Admin.module#AdminModule'
	},
	{
		path:"Console",
		loadChildren:'./Console/Console.module#ConsoleModule'
	},
	{
		path:"RuanwenClient",
		loadChildren:'./Apps/RuanwenClient/ruanwen.module#RuanwenModule'
	},	
	{
		path:"RuanwenService",
		loadChildren:'./Apps/RuanwenService/ruanwen-service.module#RuanwenServiceModule'
	},
	{
		path:'BsbyService',
		loadChildren:'./Apps/BsbyService/bsbyService.module#BsbyServiceModule'
	},
	{
		path:'BsbyClient',
		loadChildren:'./Apps/BsbyClient/bsbyClient.module#BsbyClientModule'
	},
	{
		path:'Gongdan',
		loadChildren:'./Apps/Gongdan/gongdan.module#GongdanModule'
	},
	{
		path:'',
		redirectTo:'login',
		pathMatch:'full'
	},
	{
		path:'error',
		component: ErrorComponent
	},
	{
		path:"**",
		redirectTo:'login',
		pathMatch:'full'
	}
]; 

// export const AppRoutes: ModuleWithProviders = RouterModule.forChild(appRoutes);

