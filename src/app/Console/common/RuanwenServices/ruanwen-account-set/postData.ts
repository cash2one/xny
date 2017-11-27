export class postData{

	'username':string = '';
	'password':string = '';
	'appid':string = '';
	'discount':string = '';

	constructor(obj:any = {}){
	}

}

export class postDataErrorName{

	'username':string = '请输入用户名';
	'password':string = '请输入密码';
	'appid':string = '请输入秘钥ID';
	'discount':string = '请输入折扣';

}