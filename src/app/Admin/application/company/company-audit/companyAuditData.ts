export class CompanyAuditData{

	symbol:string;
	data:any = {
		'model':'Admin',
		'parentid':'',
		'path':'',
		'name':'',
		'is_left':'1',
		'status':'1',
		'type':'1',
		'fonticon':'',
		'url':''
	};

	titleData:string[] = [
		'企业名称',
		'营业执照号',
		'法人',
		'状态',
		'申请时间'
	];

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

	showDetailData: any = [
		{
			name:"企业ID",
			flag:"id",
			value:null
		},
		{
			name: "企业logo",
			flag: "logo",
			value: null
		},
		{
			name: "负责人",
			flag: "real_name",
			value: null
		},
		{
			name: "行业",
			flag: "industry_name",
			value: null
		},
		{
			name: "规模",
			flag: "scale_name",
			value: null
		},
		{
			name:"状态",
			flag : "status",
			value : null
		},
		{
			name: "创建时间",
			flag: "created_at",
			value: null
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
			name:'路由',
			action:'path',
			danger:false,
			type:'input'
		},
		{
			name:'URL',
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
					value:0,
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
	];
	editData:any = [];

}