import { Injectable } from '@angular/core';

@Injectable()
export class CartItemListService {

  public cartItemObj:any

  public result:any[]

  constructor() { 
  	this.cartItemObj = {
  		'data':[]
  	}
  	this.result = []
  }

  public setProperty(data:any[]):void{
	  Object.defineProperty(this.cartItemObj,'data',{
			get:()=>{
				return data;
			},
			set:(value)=>{
				value = [...data];
			}
	  })
  }


}
