export class btnData{
	public normal:string = '';
	public disabled:string = '';

	constructor(normal:string='',disabled:string=''){
		this.normal = normal,
		this.disabled = disabled
	}

	move(){
		return {
			normal:this.normal,
			disabled:this.disabled
		}
	}

}