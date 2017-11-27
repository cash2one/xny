import { Injectable } from '@angular/core';

@Injectable()
export class RuanwenService {

  constructor() { }


  /**
   * @author GR-03
   * @copyright 设置本地存储的函数
   * @param     [param]
   * @return    [return]
   * @param     {string}    name  [description]
   * @param     {string}    value [description]
   */
  public setStorage(name:string,value:string):void{
    window.sessionStorage.setItem(name,value) 
  }

  public getStorage(name:string):string{
  	return window.sessionStorage.getItem(name)
  }

  public removeStorage(name:string):void{
  	window.sessionStorage.removeItem(name)
  }

  public isStorage(name:string):boolean{
  	console.log(this.getStorage(name))
  	if(this.getStorage(name)!=null){
  		return true
  	}else {
  		return false
  	}
  }


}
