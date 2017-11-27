import { ViewContainerRef } from '@angular/core'

export class ShowDetailConf {
    //距离顶部
    top?: number = 0;
    //主体展示数据
    showList?: Array<{
        name:string,
        value:string,
        class?:boolean
    }> = null;
    //标题
    title?: string;
    //忽略此元素点击
    expectClick?: ViewContainerRef = null;
    zindex?:number;
}