import { Component, OnInit,Input,OnChanges,SimpleChanges,OnDestroy,Output, EventEmitter } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { membersData }		from '../membersData'

import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }  from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { GrMembersService }  from '../../../../services'
import { MembersSetAdminService }    from '../../members-set-admin/members-set-admin.service'

@Component({
  selector: 'app-members-noadminitems',
  templateUrl: './members-noadminitems.component.html',
  styleUrls: ['../../../../Console.component.scss','./members-noadminitems.component.scss']
})
export class MembersNoadminitemsComponent implements OnInit {

  @Input() public noAdminList:any[]
  @Input() public total:any
  @Output() public pboxOther:EventEmitter<string>
  @Output() public interfaceGetNoDepartment:EventEmitter<boolean>
  @Output() public pageValueChang:EventEmitter<any>   //返回页数

  public tableTitle:string[]  //表格标题
  public loading:boolean		//loading效果标示符

  public checkDepartmentData:any // 选中的部门详细信息

  public RXSetAdmin:Subscription // 接收setAdmin发射回来的数据流

  public pageData:any

  constructor(
    public riccioPboxService:RiccioPboxService,
    public riccioNotificationsService:RiccioNotificationsService,
    public grMembersService:GrMembersService,
    public membersSetAdminService:MembersSetAdminService
  ) { 
    this.pboxOther = new EventEmitter<string>()
    this.interfaceGetNoDepartment = new EventEmitter<boolean>()
    this.pageValueChang = new EventEmitter<any>()
  	this.loading = true
  	this.noAdminList = []
  	this.tableTitle = new membersData().TableTitle.NoAdminItems
    this.pageData = {
      'page':'1',
      'rows':'20'
    }
  }

  ngOnInit() {
    this.RXSetAdmin = this.membersSetAdminService.getSubject().subscribe(res=>{
      this.loading = true
      let obj = {
        'user_arr':[res['id']],
        'department_arr':[this.checkDepartmentData[0]['id']],
        'type':3
      }
      this.grMembersService.postUserDepartment(obj).subscribe(res=>{
        if(res.status===1){
          this.interfaceGetNoDepartment.emit(true)
          this.riccioNotificationsService.setSubject({text:'设置部门负责人成功'})
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
    this.RXSetAdmin.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 点击弹出设置部门负责人pbox   genre为other
   * @check     GR-05       GR-03
   * @param     {any}
   * @param     {any}
   * @param     {any}
   */
  public FnSetAdmin(list:any,dataEl:any,event:any):void{
      this.pboxOther.emit('admin')
      this.checkDepartmentData = [list]
      this.interfaceGetNoDepartment.emit(true)
      let obj = {
        genre:'other',
        el:dataEl,
        type:'Admin',
        position:{
          left:event.clientX-130,
          top:event.clientY,
          width:265
        },
        data:list
      }
      this.riccioPboxService.setSubject(obj)
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
