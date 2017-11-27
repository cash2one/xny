export class btnData{
	
	public text:string = '';
	public disabled:boolean = false

	constructor(txt:string,dis:boolean){
		this.text = txt,
		this.disabled = dis
	}

	move(){
		return {
			text:this.text,
			disabled:this.disabled
		}
	}

}