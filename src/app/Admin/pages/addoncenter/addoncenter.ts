export class AddonCenterData{

	data:any = {
		'name':'',
		'model':'',
		'app_key':'',
		'thumb':'',
		'version':'',
		'desc':'',
		'content':'',
		'status':1,
		'position':0
	};


	addShow:Array<any> = [
		{
			name:'插件名称',
			action:'name',
			type:'input',
			default:true
		},
		{
			name:'模型',
			action:'model',
			type:'input',
			default:true
		},
		{
			name:'插件key',
			action:'app_key',
			type:'input',
			default:true
		},
		{
			name:'缩略图',
			action:'thumb',
			type:'input',
			default:false
		},
		{
			name:'版本号',
			action:'version',
			type:'input',
			default:false
		},
		{
			name:'插件简介',
			action:'desc',
			type:'input',
			default:false
		},
		{
			name:'插件详情',
			action:'content',
			type:'textarea',
			default:false
		},

		{
			name:'状态',
			action:'status',
			type:'select',
			option:[
				{
					id:1,
					name:'显示'
				},
				{
					id:0,
					name:'隐藏'
				},
				{
					id:2,
					name:'禁用'
				}
			]
		},
		{
			name:'推荐',
			action:'position',
			type:'select',
			option:[
				{
					id:1,
					name:'推荐'
				},
				{
					id:0,
					name:'不推荐'
				},
			]
		}

	];
	ListData:any = [];

}