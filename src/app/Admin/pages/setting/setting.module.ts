import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {SettingComponent} from "./setting.component";
import {settingRoutes} from "./setting.routes";
import {MoreComponent} from "./more/more.component";
import {RiccioBreadcrumbModule} from "../../../Public/riccio-breadcrumb/riccio-breadcrumb.module";
import { MenuTestComponent } from './menu-test/menu-test.component';
import { TestResultComponent } from './menu-test/test-result/test-result.component';
import { TestCompareComponent } from './menu-test/test-compare/test-compare.component';
import {RiccioTreeModule} from "../../../Public/riccio-tree/riccio-tree.module";
import {DragulaModule} from "ng2-dragula";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    settingRoutes,
    RiccioBreadcrumbModule,
    RiccioTreeModule,
    DragulaModule
  ],
  exports:[
    SettingComponent
  ],
  declarations: [
    SettingComponent,
    MoreComponent,
    MenuTestComponent,
    TestResultComponent,
    TestCompareComponent
  ],
  providers:[]
})
export class SettingModule { }
