import {
  Component,
  OnInit,
  Input
} from '@angular/core'

import { BreadCrumbData } from '../riccio-breadcrumb/riccio-breadcrumb.data'

@Component({
  selector: 'app-riccio-breadcrumb',
  templateUrl: './riccio-breadcrumb.component.html',
  styleUrls: ['./riccio-breadcrumb.component.scss']
})
export class RiccioBreadcrumbComponent implements OnInit {

  //字首图标
  @Input() iconfont: string
  //面包屑数据
  @Input() breadData: BreadCrumbData[]
  @Input() fontSize: number

  constructor() {
    this.fontSize = 14
  }

  ngOnInit() {
  }

}
