export class companyData{

	'name':string = '';
	'member_name':string = '';

	constructor(obj:any = {}){

		for(let e in this){
			this[e] = obj[e]==undefined?'':obj[e]
		}

	}

}


export class postEditOrAddData{

	'cid':number = 0;				//企业id
	'member_id':number = 0;			//会员id

	constructor(cid:number = 0,memberId:number = 0){
		this.cid = cid
		this.member_id = memberId
	}

}