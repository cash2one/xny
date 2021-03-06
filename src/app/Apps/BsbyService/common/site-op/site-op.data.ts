import { FormControl } from '@angular/forms'

// 表单控件(网站基本信息)
export class SiteBaseFc{
    cid:FormControl;
    domain:FormControl;
    competition:FormControl;
    product_id:FormControl;
}

//表单控件 （网站账户信息）
export class SiteAccountFc{
    domain_admin:FormControl;
    domain_user:FormControl;
    domain_password:FormControl;
    ftp_address:FormControl;
    ftp_port:FormControl;
    ftp_user:FormControl;
    ftp_password:FormControl
}

//提交数据
export class SiteBasePost{
    cid:number = null;
    domain:string = '';
    competition:number = 1;
    product_id:number = null;
    starttime:string = new Date().toLocaleDateString();
    endtime:string = new Date().toLocaleDateString();
}

//提交数据
export class SiteAccountPost{
    domain_admin:string = null;
    domain_user:string = null;
    domain_password:string = null;
    ftp_address:string = null;
    ftp_port:number | string = 21;
    ftp_user:string = null;
    ftp_password:string = null;
}

//竞争力
export class Competitions{
    data = [
        {name:'普通竞争行业',value:1},
        {name:'激烈竞争行业',value:2}
    ]
}

//添加类型
export enum OpTypes {
    ADD,
    ADDFORCOM
}

//监听配置
export interface IConf{
    type:OpTypes,
    data?:any
}
