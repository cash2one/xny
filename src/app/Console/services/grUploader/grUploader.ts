import { HttpHeadData }  from '../../../HttpURL'

export class grUpload{

	public URL:string = '';

	constructor(name:string){
		switch (name) {
			case "logo":
				this.URL = new HttpHeadData().SAASURL+'api/console/company/upload_logo?type=logo'
				break;
			case "logo_login":
				this.URL = new HttpHeadData().SAASURL+'api/console/company/upload_logo?type=logo_login'
				break;
			case "card_on":
				this.URL = new HttpHeadData().SAASURL+'api/console/company/upload_auth?type=card_on'
				break;
			case "card_back":
				this.URL = new HttpHeadData().SAASURL+'api/console/company/upload_auth?type=card_back'
				break;
			case "license":
				this.URL = new HttpHeadData().SAASURL+'api/console/company/upload_auth?type=license'
				break;
			default:break;
		}

		this.move()
	}
	move(){
		return this.URL
	}


}