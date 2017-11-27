export class MailDriveData{

	SMTPData:any = {
		'mail_driver':'smtp',
		'mail_host':'',
		'mail_port':'25',
		'mail_name':'',
		'mail_username':'',
		'mail_password':''
	};

	ShaiyunData:any = {
		'mail_driver':'submail',
		'mail_app_id':'',
		'mail_app_key':'',
		'mail_from':''
	};

	showViewSMTP:Array<any> = [
	  	{
			name:'SMTP服务器地址',
			ph:'请输入服务器地址',
			action:'mail_host',
			danger:false,
			type:'input',
			tip:'如：smtp.qq.com'
	  	},
	  	{
			name:'端口',
			ph:'输入端口',
			action:'mail_port',
			danger:false,
			type:'input',
			tip:'默认：25',
			short:true
	  	},
	  	{
			name:'SMTP用户名',
			ph:'请输入用户名',
			action:'mail_username',
			danger:false,
			type:'input'
	  	},
	  	{
			name:'SMTP密码',
			ph:'请输入密码',
			action:'mail_password',
			danger:false,
			type:'input'
	  	},
		{
			name:'发件人名称',
			ph:'请输入发件人名称',
			action:'mail_name',
			danger:false,
			type:'input'
		}
	];

	showViewShaiyun:Array<any> = [
	  	{
			name:'APPID',
			ph:'请输入 APPID',
			action:'mail_app_id',
			danger:false,
			type:'input'
	  	},
	  	{
			name:'APPKey',
			ph:'请输入 APPKey',
			action:'mail_app_key',
			danger:false,
			type:'input'
	  	},
	  	{
			name:'发件人',
			ph:'请输入发件人',
			action:'mail_from',
			danger:false,
			type:'input'
	  	},
	]

}