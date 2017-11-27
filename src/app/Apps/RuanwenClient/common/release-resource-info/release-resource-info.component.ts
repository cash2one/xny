import { Component, OnInit,Input,OnChanges,SimpleChanges } from '@angular/core';

import { infoData }		from './infoData'

import { GrReleaseService }    from '../../services'

@Component({
  selector: 'app-release-resource-info',
  templateUrl: './release-resource-info.component.html',
  styleUrls: ['./release-resource-info.component.scss']
})
export class ReleaseResourceInfoComponent implements OnInit {

  @Input() public infoData:any

  public data:infoData

  constructor(
    private grReleaseService:GrReleaseService
  ) { 
  	this.data = new infoData()
  }

  ngOnInit() {
  }

  ngOnChanges(change:SimpleChanges){
  	if(change!=undefined){
      console.log(this.infoData)
      this.infoData?this.fnGetMediaInfo(this.infoData['media_id']):{}
  	}
  }

  /**
   * @author GR-03
   * @copyright 获取对应的媒体信息接口方法
   * @param     [param]
   * @return    [return]
   * @param     {number|string} id [description]
   */
  public fnGetMediaInfo(id:number|string):void{

    this.grReleaseService.postRuanwenMediaPublicInfo({
      'media_id':id
    }).subscribe(res=>{
      if(res.status===1){
        this.data = {...res['data']}
      }
    },error=>{
      throw new Error(error)
    })

  }

}
