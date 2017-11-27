import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { GrAdminServices }    from './grAdmin/grAdmin.services'
import { GrMenuServicesResolve }    from './grMenu/grMenu.services.resolve'
import { GrOrderService }    from './grOrder/grOrder.services'
import { GrCompanyService }    from './grCompany/grCompany.services'
import { GrAccountServices }    from './grAccount/grAccount.service'

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
        GrAdminServices,
        GrMenuServicesResolve,
        GrOrderService,
        GrCompanyService,
        GrAccountServices
      ],
    };
  }

}