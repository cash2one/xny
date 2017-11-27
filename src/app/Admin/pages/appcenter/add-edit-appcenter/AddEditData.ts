export class AddEditData{

	data:any = {
		'model':'',
		'name':'',
		'thumb':'',
		'thumb_icon':'',
		'version':'',
		'status':0,
		'desc':'',
		'listorder':'',
		'type':0,
		'content':'',
		'path':'',
		'position':0,
		'iconfont':''
	}

	showData:Array<any> = [
		{
			name:'应用标识',
			action:'model',
			danger:false,
			type:'input',
			ph:'请输入应用标识'
		},
		{
			name:'应用名称',
			action:'name',
			danger:false,
			type:'input',
			ph:'请输入应用名称'
		},
		{
			name:'缩略图',
			action:'thumb',
			danger:false,
			type:'btn',
			ph:'点击选择要上传的缩略图'
		},
		{
			name:'缩略图图标',
			action:'thumb_icon',
			danger:false,
			type:'btn',
			ph:'点击选择要上传的缩略图图标'
		},
		// {
		// 	name:'应用图标',
		// 	action:'iconfont',
		// 	danger:false,
		// 	type:'input',
		// 	ph:'请输入图标标示，例 icon-user'
		// },
		{
			name:'版本',
			action:'version',
			danger:false,
			type:'input',
			ph:'请输入版本号'
		},
		{
			name:'状态',
			action:'status',
			danger:false,
			type:'select',
			option:[
				{
					value:0,
					name:'隐藏'
				},
				{
					value:1,
					name:'显示'
				},
				{
					value:2,
					name:'禁用'
				}
			]
		},
		{
			name:'排序',
			action:'listorder',
			danger:false,
			type:'input',
			ph:'排序操作'
		},
		{
			name:'应用类型',
			action:'type',
			danger:false,
			type:'select',
			option:[
				{
					value:0,
					name:'系统默认应用'
				},
				{
					value:1,
					name:'商业应用'
				},
				{
					value:2,
					name:'定制应用'
				}
			]
		},
		{
			name:'推荐',
			action:'position',
			danger:false,
			type:'select',
			option:[
				{
					value:0,
					name:'不推荐'
				},
				{
					value:1,
					name:'推荐'
				}
			]
		},
		{
			name:'路径',
			action:'path',
			danger:false,
			type:'input',
			ph:'请输入路径'
		},
		{
			name:'简介',
			action:'desc',
			danger:false,
			type:'textarea',
			ph:'请输入应用简要描述'
		},
		{
			name:'应用详情',
			action:'content',
			danger:false,
			type:'content',
			ph:'请输入内容'
		}
	]

}






































