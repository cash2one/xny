export class Enum{
	
    public 'name':string;
    public 'id':string|number = '';

	constructor(message:string = ''){
		this.name = message
	}

	move(){
		return {
			name:this.name,
			id:this.id
		}
	}

}