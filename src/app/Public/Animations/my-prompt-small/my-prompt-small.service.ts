import { Injectable } from '@angular/core';

@Injectable()
export class MyPromptSmallService {

  private PromptSmall:any;

  constructor() { 

  	this.PromptSmall = {
		TipClassName:'',
	    TipPosition:'', 	  		
	    TipText:''
  	}
    				
  }

  // 验证小弹窗提示 | 第三个参数是对象
  public showPromptSmall(_text:any,_class:string,_position:any={top:"0px",right:"10%"}):void{
  	console.log(_text)
    Object.assign(this.PromptSmall,{TipClassName:_class,
                                    TipText:_text,
                                    TipPosition:_position})


    setTimeout(()=>{Object.assign(this.PromptSmall,{TipClassName:null,TipText:null})},2000)
    
  }


}
