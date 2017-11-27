import { ElementRef } from '@angular/core'
import { FormControl } from '@angular/forms'

export class RoleOpConf{
    expectClick:ElementRef;
}

export class RoleOpData{
    site_id:number;
    roleInfo:any;
    serviceInfo:any;
}

// 表单控件(添加角色)
export class AddRoleFc{
    name:FormControl;
}

export class AddRolePostData{
    site_id:number = null;
    name:string = '';
}