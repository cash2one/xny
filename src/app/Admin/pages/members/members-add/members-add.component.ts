import { Component, OnInit,Output,Input, EventEmitter} from '@angular/core';

import { animations }			from '../../../../Public/Animations/index'

@Component({
  selector: 'app-admin-members-add',
  templateUrl: './members-add.component.html',
  styleUrls: ['./members-add.component.scss'],
  animations:[
  	animations.flyIn
  ]

})
export class MembersAddComponent implements OnInit {

  @Output() public callBackData:EventEmitter<any> = new EventEmitter<any>();
  @Input() routerInfo:{
    model:string,
    cid:number | string
  }

  public TabSymbol:string;

  constructor() { 
  	this.TabSymbol = 'members'
  }

  ngOnInit() {
  }


  /**
   * @author GR-03
   * @copyright 关闭组件的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public Close():void{
  	this.callBackData.emit({type:'',isShow:false})
  }

  /**
   * @author GR-03
   * @copyright 接收add-to-members组件的数据来显示对应的在members-main组件的pbox组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   */
  public fnOutputMembers(event:string):void{
    this.callBackData.emit({type:event,isShow:true})
    if(event=='success'){
      this.callBackData.emit({type:'success',isShow:false})
    }else if(event==='close'){
      this.Close()
    }
  }

}
