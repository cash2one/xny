import { RouterModule } from '@angular/router'

import { AccountsComponent } from './account.component'
import { AccountHomeComponent } from './account-home/account-home.component'
import { AccountIncomeExpenseComponent } from './account-incomeExpense/account-incomeExpense.component'
import { AccountRechargeComponent } from './account-recharge/account-recharge.component'

const routes = [
    {
        path: '',
        component: AccountsComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                component: AccountHomeComponent
            },
            {
                path:'incomeExpense',
                component:AccountIncomeExpenseComponent
            },
            {
                path:'recharge',
                component:AccountRechargeComponent
            }
        ]
    }

];

export const AccountRoutes = RouterModule.forChild(routes);
