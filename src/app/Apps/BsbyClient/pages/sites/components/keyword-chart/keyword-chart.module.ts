import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularEchartsModule } from 'ngx-echarts'

import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'

import { KeywordChartComponent } from './keyword-chart.component'
import { KeywordChartService } from './keyword-chart.service'

@NgModule({
  imports: [
    CommonModule,
    AngularEchartsModule,
    RiccioPopDatePickerModule
  ],
  declarations: [
    KeywordChartComponent
  ],
  exports:[
    KeywordChartComponent
  ],
  providers:[
    KeywordChartService
  ]
})
export class KeywordChartModule { }
