export class MenuData{

	symbol:string;
	data:any = {

		'model':'Admin',
		'parentid':'',
		'path':'',
		'name':'',
		'is_left':1,
		'status':1,
		'type':1,
		'fonticon':'',
		'url':'',
		'parameter':''

	};

	affiliatedTeam:any = {
	  isShow:false,
	  data:{
	    item:[],
	    client:{
	      x:"",
	      y:""
	    }
	  }
	}

	titleList:Array<string>=[
		'排序',
		'菜单名称',
		'模型',
		'api 路由',
		'前端路由',
		'位置',
		'图标',
		'状态',
		'类型',
		'管理操作'
	]

	showDetailData: any = [
            {
                  name: "菜单ID",
                  flag: "id",
                  value: null
            },
            {
                  name: "模型",
                  flag: "model",
                  value: null
            },
            {
                  name: "api路由",
                  flag: "path",
                  value: null
            },
            {
                  name: "前端路由",
                  flag: "url",
                  value: null
            },
            {
                  name: "位置",
                  flag: "is_left",
                  value: null
            },
			{
				  name:"类型",
				  flag:"type",
				  value:null
			},
			{
				  name:"状态",
				  flag:"status",
				  value:null
			},
			{
				  name:"版本",
				  flag:"version",
				  value:null
			},
			{
				  name:"图标",
				  flag:"fonticon",
				  value:null
			}
      ]

	addShow:Array<any> = [
		{
			name:'模型',
			action:'model',
			danger:false,
			type:'input'
		},
		{
			name:'父级菜单',
			action:'parentid',
			danger:false,
			type:'input'
		},
		{
			name:'菜单名称',
			action:'name',
			danger:false,
			type:'input'
		},
		{
			name:'api接口',
			action:'path',
			danger:false,
			type:'input'
		},
		{
			name:'前端路由',
			action:'url',
			danger:false,
			type:'input'
		},
		{
			name:'显示位置',
			action:'is_left',
			danger:false,
			type:'select',
			option:[
				{
					value:1,
					name:'左侧菜单'
				},
				{
					value:2,
					name:'主内容右上切换菜单'
				},
				{
					value:3,
					name:'企业控制台应用配置选项卡'
				}
			]
		},
		{
			name:'状态',
			action:'status',
			danger:false,
			type:'select',
			option:[
				{
					value:1,
					name:'显示'
				},
				{
					value:2,
					name:'隐藏'
				}
			]
		},
		{
			name:'类型',
			action:'type',
			danger:false,
			type:'select',
			option:[
				{
					value:1,
					name:'权限'
				},
				{
					value:2,
					name:'只作为菜单'
				}
			]
		},
		{
			name:'字体图标',
			action:'fonticon',
			danger:false,
			type:'input'
		}
		// {
		// 	name:'附加参数',
		// 	action:'parameter',
		// 	danger:false,
		// 	type:'textarea'
		// }
	];
	editData:any = [];

	modelNames:any = {
		Admin:'总控制中心',
		Console:'企业控制台',
		Project:'项目管理',
		RuanwenService:'软文营销（服务端）',
		RuanwenClient:'软文营销（客户端）',
		BsbyService:'百搜百应（服务端）',
		BsbyClient:'百搜百应（客户端）'
	}

}