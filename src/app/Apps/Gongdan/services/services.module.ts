import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { XnFaqServices }    from './xnFaq/xnFaq.services'
import { XnCsdServices }    from './xnCsd/xnCsd.services'

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
        XnFaqServices,
        XnCsdServices
      ],
    };
  }

}