export class KeywordListData {
    keywordListTitles:string[] = [
        '关键词',
        '难易程度',
        '关键词类型',
        '百度排名',
        '360排名',
        '搜狗排名',
        '启动时间',
        '状态',
        '操作'
    ]

    //切换关键词类型数据
    keywordTypeData = [
        {name:'精准核心词',value:1},
        {name:'精准长尾词',value:2},
        {name:'品牌词',value:3},
        {name:'区域词',value:4}
    ]

    //切换关键词难易数据
    keywordDifficultData = [
        {name:'正常',value:1},
        {name:'简单',value:2},
        {name:'困难',value:3}
    ]

    //切换关键词状态数据
    keywordStatuData = [
        {name:'优化中',value:1},
        {name:'已停止',value:2}
    ]
}

export class SearchParam{
    name?:string;
    difficult?:number;
    type?:number;
    status?:number
}

export class SearchShow{
    difficult:string = '选择关键词类型';
    type:string = '选择难易程度';
    status:string = '选择状态'
}