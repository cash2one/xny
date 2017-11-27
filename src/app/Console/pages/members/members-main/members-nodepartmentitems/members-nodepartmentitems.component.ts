import { Component, OnInit ,Input,Output,OnChanges,SimpleChanges, EventEmitter,OnDestroy,ViewChild,ElementRef } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { membersData }		from '../membersData'

import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { GrMembersService }    from '../../../../services'
import { MembersSetDepartmentMainService }    from '../../members-set-department-main/members-set-department-main.service'

@Component({
  selector: 'app-members-nodepartmentitems',
  templateUrl: './members-nodepartmentitems.component.html',
  styleUrls: ['../../../../Console.component.scss','./members-nodepartmentitems.component.scss']
})
export class MembersNodepartmentitemsComponent implements OnInit {
  
  @ViewChild('Search')  public Search:ElementRef
  @Input() public noDepartmentItems:any[]
  @Input() public total:any
  @Output() public pboxOther:EventEmitter<string>
  @Output() public interfaceGetNoDepartment:EventEmitter<boolean>
  @Output() public pageValueChang:EventEmitter<any>   //返回页数

  public tableTitle:string[]  //表格标题
  public loading:boolean		//loading效果标示符

  public checkUserData:any[] // 所点击的某一个员工的详细信息

  public RXSetDepartment:Subscription // 从set－department组件发射回来的数据流

  public pageData:any

  public errorImg:boolean

  constructor(
    public riccioPboxService:RiccioPboxService,
    public riccioNotificationsService:RiccioNotificationsService,
    public grMembersService:GrMembersService,
    public membersSetDepartmentMainService:MembersSetDepartmentMainService
  ) { 
    this.checkUserData = []
    this.pboxOther = new EventEmitter<string>()
    this.interfaceGetNoDepartment = new EventEmitter<boolean>()
    this.pageValueChang = new EventEmitter<any>()
  	this.loading = true
    this.errorImg = false
  	this.tableTitle = new membersData().TableTitle.NoDepartmentItems
    this.pageData = {
      'page':'1',
      'rows':'20'
    }
  }

  ngOnInit() {
    this.RXSetDepartment = this.membersSetDepartmentMainService.getSubject().subscribe(res=>{
      // grMembersService
      this.grMembersService.postUserDepartment({
        'user_arr':[this.checkUserData[0]['id']],
        'department_arr':[res['id']],
        'type':1
      }).subscribe(res=>{
        this.loading = true
        if(res.status===1){
          this.interfaceGetNoDepartment.emit(true)
          this.riccioNotificationsService.setSubject({text:'设置主属部门成功'})
        }
      },error=>{
        throw new Error(error)
      })
    })
  }

  ngOnChanges(change:SimpleChanges){
    this.loading = false
  }

  ngOnDestroy(){
    this.RXSetDepartment.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 设置主属部门 
   * @check     GR-05       GR-03
   * @param     {any}
   * @param     {any}
   * @param     {any}
   */
  public FnSetDepartment(list:any,dataEl:any,event:any):void{
      this.pboxOther.emit('department')
      this.checkUserData = [list]
      this.riccioPboxService.setSubject({
        genre:'other',
        el:dataEl,
        type:'Department',
        position:{
          left:event.clientX-130,
          top:event.clientY,
          width:265
        },
        data:list
      })
  }

  /**
   * @author GR-03
   * @copyright 搜索事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    value [description]
   * @param     {string}    type  [description]
   */
  public FnSearchList(value:string,type:string):void{
    this.Search.nativeElement.blur()
    // constSearchValue
    if((type==='blur'&&value.trim()!=='')||value===''){
      this.FnGetNoDepartment(value)
    }
  }

  /**
   * @author GR-03
   * @copyright 获取未设置部门的员工方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetNoDepartment(name:string):void{
    this.loading = true
    this.grMembersService.getUserNoDepartment({
      'name':name,
      ...this.pageData
    }).subscribe(res=>{
      this.loading = false
      if(res.status===1){
        this.noDepartmentItems = [...res['data']['data']]
      }
    },error=>{
      throw new Error(error)
    })
  }

 /**
   * @author GR-03
   * @copyright 页数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnOutputPageValue(value:any):void{
    this.pageData.page=value.page
    this.pageData.rows=value.rows
    this.pageValueChang.emit(this.pageData)
  }



}
