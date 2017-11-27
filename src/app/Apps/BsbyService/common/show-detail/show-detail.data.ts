import { ViewContainerRef } from '@angular/core'

export class ShowDetailConf {
    //距离顶部
    top?: number = 0;
    //主体展示数据
    showList?: Array<{
        title:string,
        data:{
            name:string,
            value:string,
            flag:string,
            class?:boolean,
            img?:boolean
        }   
    }> = null;
    //标题
    title?: string;
    //忽略此元素点击
    expectClick?: ViewContainerRef = null;
    //顶部按钮返回的数据
    activeList?: any = null;
    headBtn?: boolean = false;
    zindex?:number;
}