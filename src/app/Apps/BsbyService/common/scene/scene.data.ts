import { ElementRef } from '@angular/core'

export class SceneData {
    status: any[] = [
        { name: '全部', value: 0, active: true },
        { name: '执行中', value: 1, active: false },
        { name: '已停止', value: 2, active: false },
        { name: '待执行', value: 3, active: false }
    ]
}

export class SceneOb {
    expectClick: ElementRef;
    type: string = 'add';
    action:string = 'my';
    sceneData?: any;
    showExc?:boolean = true;
    excName?:string;
}

export class PostData {
    type: number = 3;
    name: string = '';
    action:string = 'my';
    id?: number;
    status?: number = null;
    product_id?: number = null;
    executor_userid?: number = null;
    executor_name?: string;
    service_userid?: number = null;
    service_name?: string;
    starttime?: string[] = [null, null];
    endtime?: string[] = [null, null];
}

export class PostSearchData {
    name: string = '';
    action:string = 'my';
    status?: number = null;
    product_id?: number = null;
    executor_userid?: number = null;
    service_userid?: number = null;
    starttime?: string[] = [null,null];
    endtime?: string[] = [null,null];
}