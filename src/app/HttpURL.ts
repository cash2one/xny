export class HttpHeadData {
	URL:string = "http://www.grzhixing.com";
	// URL:string = "";


	// grsaas的地址
	SAASURL:string = "";
	// SAASURL:string = "";

	constructor(){
		let url = window['setting']['siteurl']
		this.SAASURL = url
	}

}