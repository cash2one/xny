import { ILeftData } from '../Public/riccip-app-left-menu/riccio-app-left-menu.interface'

export class SettingData{
    name:string = ''	   // 用户名
    mobile:string = '';    // 手机号
    real_name:string = '';  // 昵称
    qq:string = '';        // qq
    email:string = '';     // 邮箱
    sex:number|string = '1'; // 性别
    thumb:string = '';     // 头像
}

export class LeftData{
    data:ILeftData = {
        title:'',
        logo:'',
        module:'',
        menu:new LeftMenu().menu
    }
}

export class LeftMenu{
    menu:any[]
    constructor(){
        this.menu = [
            {
                name:'个人设置',
                url:'setting',
                fonticon:'common-xiugaimima'
            },
            {
                name:'密码修改',
                url:'password',
                fonticon:'common-qiye'
            },
            {
                name:'企业选择',
                url:'companies',
                fonticon:'common-gerenshezhi'
            }
        ]
    }
}
