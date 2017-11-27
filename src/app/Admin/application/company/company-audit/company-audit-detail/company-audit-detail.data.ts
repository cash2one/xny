import { ViewContainerRef } from '@angular/core'

export class Conf {
    //距离顶部
    top: number = 0;
    //忽略此元素点击
    expectClick: ViewContainerRef = null;
    //认证企业详情
    detail:string
}

export class ShowDetail{
    showDetailData=[
        {
            name:'营业执照号',
            flag:'lisense_code',
            value:null
        },
        {
            name:'法人',
            flag:'name',
            value:null
        },
        {
            name:'法人证件',
            subName:'（正面）',
            isImg:true,
            flag:'card_on',
            value:null
        },
        {
            name:'法人证件',
            subName:'（反面）',
            isImg:true,
            flag:'card_back',
            value:null
        },
        {
            name:'营业执照',
            flag:'license',
            isImg:true,
            value:null
        }
    ]
}