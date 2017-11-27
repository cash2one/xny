import { Component, OnInit ,ViewChild} from '@angular/core';

import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

import { GrConfigService }    from '../../../../services'
import { PersonalService }    from '../../../../../Public/Personal/personal.service'
import { GrMenuListService }    from '../../../../services'

import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'

import { configData }    from './configData'

@Component({
  selector: 'app-config-drive',
  templateUrl: './config-drive.component.html',
  styleUrls: [
    '../../../../Admin.component.scss',
    './config-drive.component.scss',
    './config-drive.component.new.scss'
  ]
})
export class ConfigDriveComponent implements OnInit {
  public smsUrl:any;
  //短信驱动类型
  public driveType:string
  //短信驱动类型数组
  public driveTypes:Array<{
    type:string,
    name:string
  }>
  //存放所有驱动数据
  public driveConfig:any
  //按钮状态
  public btnStatus:{
    status:boolean,
    text:string
  }

  constructor(
    public grConfigService:GrConfigService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public grMenuListService:GrMenuListService,
    public personalService:PersonalService,
    public riccioNotificationsService:RiccioNotificationsService
  ) { 
    this.driveConfig = new configData().smsDriverData
    this.resolveDriveTypes()
    this.btnStatus={
      status:true,
      text:'保存'
    }
  }

  ngOnInit() {
    //获取当前配置的sms信息
    this.grConfigService.getSms().subscribe(res=>{
      //驱动数据赋值
      let temp = this.driveConfig[res.data.drivername]['value']
      Object.keys(res.data.driverdata).forEach(key=>{
        temp.forEach(item=>{
          if(item['name'] === key){
            item['value'] = res.data.driverdata[key]
          }
        })
      })
      this.driveType = res.data.drivername
      this.smsUrl = this.driveConfig[this.driveType]['base'].url
    })
  }

  /**
   * 处理编辑的数据（内存缓存需求）
   * @author GR-05
   * @check GR-03
   */
  public resolveDriveTypes(){
    this.driveTypes =[]
    Object.keys(this.driveConfig).forEach(key=>{
      this.driveTypes.push({
        name:this.driveConfig[key]['base']['real_name'],
        type:key
      })
    })
  }

  /**
   * 驱动选项切换事件
   * @author GR-05
   * @check GR-03
   */
  public fnTypeChange(){
    this.smsUrl = this.driveConfig[this.driveType]['base'].url
    Object.keys(this.driveConfig).forEach(key=>{
      if(key !== this.driveType){
        this.driveConfig[key]['value'].forEach(item=>{
          item['valid'] = true
        })
      }
    })
  }

  //点击保存后的事件
  public fnSaveSMS():void{
    //表单验证
    let isValid = false
    let src = this.driveConfig[this.driveType]['value']
    src.forEach(item=>{
      (item['value'] !== '' && item['value']!==null)?item['valid'] = true:item['valid']=false
    })
    isValid = src.every(item=>{
      return item['valid'] === true
    })
    //验证失败
    if(!isValid){
       this.riccioNotificationsService.setSubject({
         text:'输入验证失败',
         status:'danger'
       })
    }else{
      let driveData = {}
      this.driveConfig[this.driveType]['value'].forEach(item=>{
        driveData[item['name']] = item['value']
      })
      let data={
        drivername:this.driveType,
        driverdata:driveData,
        templateid:''
      }
      this.btnStatus={
        status:false,
        text:'保存中...'
      }
      this.grConfigService.postSmsEdit(data).subscribe(res=>{
        if(res.status===1){
          this.personalService.showPromptSmall('保存成功','success',{right:'50%',top:'30%'})
          this.btnStatus={
            status:true,
            text:'保存'
          }
        }
      })  
    }
  }
}
