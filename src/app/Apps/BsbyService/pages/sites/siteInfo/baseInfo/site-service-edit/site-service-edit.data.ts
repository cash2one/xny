import { FormControl } from '@angular/forms'

//表单控件 （网站服务信息）
export class SiteServiceFc{
    starttime:FormControl;
    endtime:FormControl;
    service_type:FormControl
}

//提交数据
export class SiteServicePost{
    starttime:string = null;
    endtime:string = null;
    service_type:number = 1;
}

//服务方式
export class ServiceTypes{
    data = [
        {name:'首次开通',value:1},
        {name:'续费',value:2}
    ]
}
