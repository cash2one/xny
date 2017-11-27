import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GrReleaseService }    from './grRelease/grRelease.services'
import { GrOrderService }    from './grOrder/grOrder.services'
import { GrMainService }    from './grMain/grMain.services'
import { GrArticleServices }  from './grArticle/grArticle.services'
import { GrMenuServicesResolve }    from './grMenu/grMenu.services.resolve'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: []
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: ServicesModule,
      providers: [
        GrReleaseService,
        GrOrderService,
        GrMainService,
        GrMenuServicesResolve,
        GrArticleServices
      ],
    };
  }

}