import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { RuanwenCompanyComponent } from './ruanwen-company.component';

import { ruanwenCompanyRoutes }		from './ruanwen-company.routes';
import { CompanyMainComponent } from './company-main/company-main.component'

import { RiccioModalModule }    from '../../../../Public/riccio-modal/riccio-modal.module'
import { CompanyEditAddModule }		from '../../common/company-edit-add/company-edit-add.module'
import { RiccioPaginationsModule }    from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }    from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CompanyEditAddModule,
    ruanwenCompanyRoutes,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    RiccioPboxModule,
    RiccioModalModule
  ],
  exports:[
  	RuanwenCompanyComponent
  ],
  declarations: [RuanwenCompanyComponent, CompanyMainComponent]
})
export class RuanwenCompanyModule { }
