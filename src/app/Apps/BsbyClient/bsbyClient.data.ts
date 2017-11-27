export class MenusData{
    appName?:string;

    menus:any[] = [];

    secMenus:any[] = [];

    secMenusTitle:string= '';

    secMenuTitleData:{
        customer:string,
        site:string,
        product:string,
        keyword:string,
        demand:string,
        programme:string,
        article:string,
        friendLink:string,
        backLink:string
    } = {
        customer:'客户管理',
        site:'网站管理',
        product:'产品管理',
        keyword:'关键词管理',
        demand:'需求沟通',
        programme:'方案管理',
        article:'文章更新',
        friendLink:'友情链接',
        backLink:'网站外链'
    }

    siteMgrMenus:any[] = [
        {
            name:'网站详情',
            fonticon:'bsby-wangzhan',
            url:'site/info'
        },
        {
            name:'关键词管理',
            fonticon:'bsby-icon_keyword',
            url:'site/keyword'
        },
        {
            name:'执行方案',
            fonticon:'bsby-fangan-copy',
            url:'site/programme'
        },
        {
            name:'报表中心',
            fonticon:'bsby-baobiao',
            url:'site/baobiao',
            disabled:true
        },
        {
            name:'软文营销',
            fonticon:'bsby-ruanwentuiguang',
            url:'RuanwenClient/article/list',
            newTarget:true,
            notId:true
        },
        {
            name:'需求沟通',
            fonticon:'bsby-taolun',
            url:'site/demand'
        },
        {
            name:'文章更新',
            fonticon:'bsby-article',
            url:'site/article'
        },
        {
            name:'友情链接',
            fonticon:'bsby-youlian',
            url:'site/friendLink'
        },
        {
            name:'网站外链',
            fonticon:'bsby-wailian',
            url:'site/backLink'
        }
    ]
}

//分页相关
export class PageData{
    page:number = 1;
    rows:number = 20;
    total:number = 0;
    emptyText:string = '没有查询到相关数据！'
}