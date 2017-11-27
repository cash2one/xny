import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompanyConsumeModule } from './company-consume/company-consume.module'

import { CompanyComponent } from './company.component';
import { CompanyService } from './company.service'

import { companyRoutes } from './company.routes';
import { CompanyMainComponent } from './company-main/company-main.component';
import { CompanyManagerComponent } from './company-manager/company-manager.component'
import { CompanyConsumeAllComponent } from './company-consumeAll/company-consumeAll.component'
import { ComRechargeComponent } from './company-recharge/company-recharge.component'
import { ComRechargeService } from './company-recharge/company-recharge.service'

import { CompanyAuditComponent } from './company-audit/company-audit.component'
import { CompanyAuditDetailComponent } from './company-audit/company-audit-detail/companyAuditDetail.component'
import { CompanyAuditDetailService } from './company-audit/company-audit-detail/company-audit-detail.service'
import { CompanyChargeModule } from './company-charge/company-charge.module'
import { CompanyOpComponent } from './company-op/company-op.component'
import { CompanyOpService } from './company-op/company-op.service'

import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioNotificationsModule } from '../../../Public/riccio-notifications/riccio-notifications.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { ShowDetailModule } from '../../show-detail/show-detail.module'
import { MyLoadingModule } from '../../../Public/Animations/my-loading/my-loading.module'
import { RiccioBrowseModule } from '../../../Public/riccio-browse/riccio-browse.module'
import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSelectMembersModule } from '../../../Public/riccio-select-members/riccio-select-members.module'
import { RiccioSingleMembersModule } from '../../../Public/riccio-single-members/riccio-single-members.module'
import { RiccioSpinnersModule } from '../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioDatepickersModule } from '../../../Public/riccio-datepickers/riccio-datepickers.module'
import { RiccioBreadcrumbModule } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.module'
import { DirectiveModule } from '../../../Public/directives/directive.module';
import { ApplicationManagementComponent } from './application-management/application-management.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    companyRoutes,
    CompanyConsumeModule,
    RiccioNotificationsModule,
    ShowDetailModule,
    MyLoadingModule,
    RiccioPboxModule,
    RiccioModalModule,
    RiccioBrowseModule,
    RiccioPaginationsModule,
    CompanyChargeModule,
    RiccioSelectMembersModule,
    RiccioSingleMembersModule,
    RiccioSpinnersModule,
    RiccioDatepickersModule,
    RiccioBreadcrumbModule,
    DirectiveModule
  ],
  exports: [
    CompanyComponent
  ],
  declarations: [
    CompanyComponent,
    CompanyMainComponent,
    CompanyAuditComponent,
    CompanyAuditDetailComponent,
    CompanyManagerComponent,
    CompanyConsumeAllComponent,
    CompanyOpComponent,
    ComRechargeComponent,
    ApplicationManagementComponent
  ],
  providers: [
    CompanyService,
    CompanyAuditDetailService,
    CompanyOpService,
    ComRechargeService
  ]
})
export class CompanyModule { }
