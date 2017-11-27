import { FormControl } from '@angular/forms'

//表单控件 （网站信息）
export class SiteDescFc{
    title:FormControl;
    keyword:FormControl;
    description:FormControl;
}

//提交数据
export class SiteDescPost{
    title:string = null;
    keyword:string = null;
    description:string = null;
}