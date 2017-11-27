export class classifyObj{

	name : string = '';
	// is_assign : number = 1;
	// is_admin : number = 1;
	status : number = 1;
	parentid : number = 0;
	remark : string = '';
	icon : string = '';

	constructor( obj : any = {} ) {

		for(let e in this) {
			this[e] = obj[e]!=undefined ? obj[e] : this[e]
		}

	}

}