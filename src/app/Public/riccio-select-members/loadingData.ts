export class loadingData{

	public isShow:boolean = false;
	public text:string = '';

	constructor(isShow:boolean=false,text:string=''){
		this.isShow = isShow,
		this.text = text
	}
	move(){
		return {
			isShow:this.isShow,
			text:this.text
		}
	}

}