import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule,FormsModule } from '@angular/forms'

import { RiccioPaginationsModule } from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule } from '../../../Public/riccio-pbox/riccio-pbox.module'
import { RiccioDatepickersModule } from '../../../Public/riccio-datepickers/riccio-datepickers.module'

import { ShowDetailModule } from './show-detail/show-detail.module'

import { AccountRoutes } from './account.route'
import { AccountsComponent } from './account.component'
import { AccountHomeComponent } from './account-home/account-home.component'
import { AccountIncomeExpenseComponent } from './account-incomeExpense/account-incomeExpense.component'
import { AccountRechargeComponent } from './account-recharge/account-recharge.component'
import { RechargeComponent } from './account-recharge/recharge/recharge.component'
import { NoteComponent } from './account-note/account-note.component'

import { AccountService } from './account.service'
import { RechargeService } from './account-recharge/recharge/recharge.service'
import { NoteService } from './account-note/account-note.service'

@NgModule({
    imports: [
        CommonModule,
        AccountRoutes,
        RiccioPaginationsModule,
        RiccioSpinnersModule,
        FormsModule,
        ReactiveFormsModule,
        RiccioModalModule,
        RiccioPboxModule,
        RiccioDatepickersModule,
        ShowDetailModule
    ],
    declarations: [
        AccountsComponent,
        AccountHomeComponent,
        AccountIncomeExpenseComponent,
        AccountRechargeComponent,
        RechargeComponent,
        NoteComponent
    ],
    providers:[
        AccountService,
        RechargeService,
        NoteService
    ]
})
export class AccountModule { }
