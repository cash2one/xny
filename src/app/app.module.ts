import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, ROUTER_CONFIGURATION } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';
// 通用组件模块
import { RiccioNotificationsModule } from './Public/riccio-notifications/riccio-notifications.module'
import { RiccioCutModule } from './Public/riccio-cut/riccio-cut.module'
import { RiccioLoadingModule } from './Public/riccio-loading/riccio-loading.module'
import { RiccioTopLoadingModule } from './Public/riccio-top-loading/riccio-top-loading.module'

import { AppService } from './app.service'

import { LoginService } from './Public/Login/Login.service';
import { PersonalService } from './Public/Personal/personal.service'

import { LoginModule } from './Public/Login/Login.module'
import { RegisterModule } from './Public/register/register.module'
import { FindpwdModule } from './Public/findpwd/findpwd.module'


//自身的配置
import { appRoutes } from './app.routes';
import { AppComponent } from './app.component';

// 共用api接口模块
import { ServicesModule } from './ApiServices/services.module';

// 处理错误模块
import { ErrorModule } from './Error/error.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        LoginModule,
        RegisterModule,
        FindpwdModule,
        RiccioNotificationsModule,
        RiccioCutModule,
        RiccioLoadingModule,
        RiccioTopLoadingModule,
        ErrorModule,
        ServicesModule.forRoot(),
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [
        AppService,
        LoginService,
        PersonalService,
        PathLocationStrategy,
        HashLocationStrategy
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
