export class PageData{
    page:number = 1;
    rows:number = 20;
    emptyText:string = '没有查询到相关数据';
    total:number = 0;
}

//公用组件的接口
export class MsgCommon{
    title: string = '消息'
    //是否显示全部已读按钮
    showReadAll: boolean = true
    //是否显示标记为已读
    showFlagRead: boolean = true
    //相关消息列表
    messageList: any[] = []
    //数据总量
    messageTotal: number = 0
    //loading
    loadingType: string = 'show'
}