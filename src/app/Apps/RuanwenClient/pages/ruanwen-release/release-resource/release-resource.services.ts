import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { GrReleaseService }  from '../../../services'
import { GrOrderService }    from '../../../services'

@Injectable()
export class ReleaseResourceServices {

  private ActionInput   = new Subject<any>();

  constructor(
    private grReleaseService:GrReleaseService,
    private grOrderService:GrOrderService
  ) {  }

  //传入数据
  public setSubject(mission: any) {
    this.ActionInput.next(mission);
  }
  public getSubject():Observable<any>{
  	return this.ActionInput.asObservable()
  }

  /**
   * @author GR-03
   * @copyright 处理添加到购物车的事件
   * @param     [param]
   * @return    [return]
   * @param     {string[]|number[]} list [description]
   */
  public handleAddCart(data:any[]):void{

    let ids = data.map(e=>e['media_id']).join(',')

    this.grReleaseService.postRuanwenCartAdd({
      'ids':ids
    }).subscribe(res=>{
      if(res.status===1){
        this.setSubject({
          'type':'ADD',
          'data':data
        })
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 处理添加到订单媒体的事件
   * @param     [param]
   * @return    [return]
   * @param     {string[]|number[]} list [description]
   */
  public handleAddOrderMedia(id:number|string,data:any[]):void{

    let ids = data.map(e=>e['media_id'])

    this.grOrderService.postOrderAddMedia({
      'id':id,
      'media_ids':[...ids]
    }).subscribe(res=>{
      if(res.status===1){
        this.setSubject({
          'type':'ADD_MEDIA',
          'data':data
        })
      }
    },error=>{
      throw new Error(error)
    })
  }


  /**
   * @author GR-03
   * @copyright 处理删除购物车的事件
   * @param     [param]
   * @return    [return]
   * @param     {number|string} list [description]
   */
  public handleDelCart(data:any[]){

    let ids = data.map(e=>e['media_id']).join(',')

    this.grReleaseService.postRuanwenCartDel({
      'ids':ids
    }).subscribe(res=>{
      if(res.status===1){
        this.setSubject({
          'type':'DELETE',
          'data':data
        })
      }
    },error=>{
      throw new Error(error)
    })
  }


  /**
   * @author GR-03
   * @copyright 处理添加到订单媒体的事件
   * @param     [param]
   * @return    [return]
   * @param     {string[]|number[]} list [description]
   */
  public handleDelOrderMedia(id:number|string,data:any[]):void{

    let ids = data.map(e=>e['media_id'])

    this.grOrderService.postOrderDelMedia({
      'id':id,
      'media_ids':[...ids]
    }).subscribe(res=>{
      if(res.status===1){
        this.setSubject({
          'type':'DELETE_MEDIA',
          'data':data
        })
      }
    },error=>{
      throw new Error(error)
    })
  }


}
