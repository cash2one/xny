export class UserReviseData{

	data:any = {

		'name':'',
		'password':'',
		'email':'',
		'real_name':'',
		'thumb':'',
		'mobile':'',
		'sex':'',
		'id':''

	};

	showView:Array<any> = [
		{
			name:'用户名',
			action:'name',
			type:'input'
		},
		{
			name:'密码',
			action:'password',
			type:'input'
		},
		{
			name:'邮箱',
			action:'email',
			type:'input'
		},
		{
			name:'真实姓名',
			action:'real_name',
			type:'input'
		},
		{
			name:'缩略图',
			action:'thumb',
			type:'img'
		},
		{
			name:'手机',
			action:'mobile',
			type:'input'
		},

		{
			name:'性别',
			action:'sex',
			type:'button'
		}
	]



}