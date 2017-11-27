export class itemListInfo{

	public media_name:string = '';
	public media_price:string = '';
	public media_id:string|number = '';

	constructor(media_name:string='',media_price:string='',media_id:number|string=''){
		this.media_name = media_name,
		this.media_price = media_price,
		this.media_id = media_id
	}
	move(){
		return {
			'media_name':this.media_name,
			'media_price':this.media_price,
			'media_id':this.media_id
		}
	}

}