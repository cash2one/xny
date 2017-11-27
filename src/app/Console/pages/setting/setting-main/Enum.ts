export class Enum{
	public name:string = '';
	public id:string|number = '';

	constructor(message:string,id:number|string = ''){
		this.name = message
		this.id = id
	}

	move(){
		return {
			name:this.name,
			id:this.id
		}
	}
}