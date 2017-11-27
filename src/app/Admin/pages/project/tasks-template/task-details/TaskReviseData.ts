export class TaskReviseData{

	data:any = {

		'name':'',
		'listorder':'',
		'status':'',
		'tagid':'',
		'thumb':'',
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
			name:'姓名',
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
			action:'tel',
			type:'input'
		},
		{
			name:'职务',
			action:'job',
			type:'input'
		},
		{
			name:'员工编号',
			action:'employeecode',
			type:'input'
		},
		{
			name:'性别',
			action:'sex',
			type:'button'
		},
		{
			name:'员工ID',
			action:'id',
			type:'input'
		}
	];



}