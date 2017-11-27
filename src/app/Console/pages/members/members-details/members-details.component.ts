import { Component, OnInit,Input,OnChanges,SimpleChanges,Output, EventEmitter } from '@angular/core'

import { animations }   from '../../../../Public/Animations/index'

import { detailsTitle }    from './detailsTitle'

@Component({
  selector: 'app-members-details',
  templateUrl: './members-details.component.html',
  styleUrls: ['../../../Console.component.scss','./members-details.component.scss'],
  animations:[
  	animations.rightIn
  ]
})
export class MembersDetailsComponent implements OnInit {
 
  @Input() data:any
  @Input() isShow:boolean
  @Output() callData:EventEmitter<boolean>

  public detailsData:any
  public detailsTitle:any[]

  constructor() {
    this.detailsData = this.data?this.data:{}
    this.detailsTitle = new detailsTitle().data
    this.callData = new EventEmitter<boolean>()
  }

  ngOnInit() {}

  ngOnChanges(changes:SimpleChanges){

    this.detailsData = this.data?this.data:{}
    this.FnProcessData()
    this.fnRuleData()

  }

  //关闭按钮事件
  public Close():void{
    this.callData.emit(false)
  }

  /**
   * @author GR-03
   * @copyright 处理详情的数据，把附属部门和主属部门抽取出名称来显示在表格中
   * @param     null
   * @return    null
   * @check     GR-05       GR-03
   */
  public FnProcessData():void{
    let department = this.detailsData['department']
     if(Array.isArray(department)===true){
       let noMain = department.filter(e=>e['is_main']==0)
       let isMain = department.filter(e=>e['is_main']==1)
       this.detailsData['department_name'] = noMain?noMain.map(e=>e['name']).join(','):''
       this.detailsData['department_main'] = isMain?isMain.map(e=>e['name']).join(','):''
     }
  }

  /**
   * @author GR-03
   * @copyright 处理该成员的角色列表数据，只显示名称
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnRuleData():void{
    let ruleList = Array.isArray(this.detailsData['auth_group'])==true?[...this.detailsData['auth_group']]:[]
    if(Array.isArray(ruleList)===true){
      this.detailsData['auth_group'] = ruleList.map(e=>e['groupname']).join(',')
    }
  }

}
