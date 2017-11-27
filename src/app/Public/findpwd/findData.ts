export class findpwdData{

	'mobile':string = '';
	'code':string = '';

}

export class newPassword{

	'password':string = '';
	'password_confirmation':string = ''

	constructor(psw:string = '',conPsw:string = ''){
		this.password = psw
		this.password_confirmation = conPsw
	}

}