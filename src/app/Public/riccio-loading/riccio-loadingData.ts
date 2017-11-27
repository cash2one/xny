import { ElementRef } from '@angular/core'

export class Loadings{
    // loading 类型   layer | base
    type:string = 'layer';
    //弹窗loading
    message:string = '等待中...';

    // 加载loading
    elParent:ElementRef = null;
    baseType:string = 'loading';
}