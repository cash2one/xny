import { Component, OnInit ,ElementRef,OnDestroy} from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { editData }		from './editData'

import { RiccioPboxService }		from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioModalService }    from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }    from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { GrSettingService }		from '../../../../services'

import { Enum }		from './enum'
import { btnData }    from './btnData'

@Component({
  selector: 'app-edit-area-setting',
  templateUrl: './edit-area-setting.component.html',
  styleUrls: ['../../../../Console.component.scss','./edit-area-setting.component.scss']
})

export class EditAreaSettingComponent implements OnInit {

  /**
   * 分别对应省,市,区,行业,规模
   * @type {Enum}
   */
  public province:Enum
  public city:Enum
  public area:Enum
  public industry:Enum
  public scale:Enum

  /**
   * 选中的省市区数据
   * @type {string}
   */
  public locationData:Array<{name:string,id:number}>

  /**
   * 订阅pbox组件的subject
   * @type {Subscription}
   */
  public riccioPboxRX$:Subscription

  /**
   * 用来判断改变的地区前后的标志位
   * @type {[type]}
   */
  public watchDataId:number|string

  /**
   * 保存按钮样式变化数据
   * @type {btnData}
   */
  public btnData:btnData

  /**
   * 判断是否显示loading效果的字段
   * @type {boolean}
   */
  public loading:boolean

  constructor(
  	public grSettingService:GrSettingService,
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioModalService:RiccioModalService,
  	public riccioPboxService:RiccioPboxService
  ) { 
    this.loading = true
    this.btnData = new btnData()
    this.watchDataId = ''
  	this.locationData = new Array<{name:string,id:number}>()
    this.province = new Enum('请选择省')
    this.city = new Enum('请选择市')
    this.area = new Enum('请选择区')
    this.industry = new Enum('请选择行业')
    this.scale = new Enum('请选择规模')
  }

  ngOnInit() {
  	this.fnGetCompanyInfo()
  	/**
  	 * 订阅pbox
  	 */
  	this.riccioPboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		this[res['type']] = {...res['data']}
      this.watchDataId = this.watchDataId==''?this[res['type']]['id']:this.watchDataId
      if(res['type']=='province'&&this.watchDataId!=this.province['id']){
        this.watchDataId = this.province['id']
        this.city = new Enum('请选择市')
        this.area = new Enum('请选择区')
      }else if(res['type']=='city'&&this.watchDataId!=this.city['id']){
        this.watchDataId = this.city['id']
        this.area = new Enum('请选择区')
      }
  	})

  }

  ngOnDestroy(){
  	this.riccioPboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取企业信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetCompanyInfo():void{
    this.loading = true
    this.grSettingService.getCompanyInfo().subscribe(res=>{
      if(res.status===1){
        this.loading = false
        this.province = {...res['data']['location_data']['province']}
        this.city = {...res['data']['location_data']['city']}
        this.area = {...res['data']['location_data']['area']}
        this.industry = {...res['data']['industry_data']}
        this.scale = {...res['data']['scale_data']}
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 选择地区的时候显示对应的pbox组件
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {string}
   * @param     {ElementRef}
   * @param     {MouseEvent}
   */
  public fnShowPboxLocation(str:string,dataEle:any,event:MouseEvent):void{
    let obj = {
      genre:'other',
      el:dataEle,
      type:str,
      position:{
        left:dataEle.getBoundingClientRect().left,
        top:dataEle.getBoundingClientRect().top,
        width:dataEle.getBoundingClientRect().width
      }
    }

    if(str==='province'){
      this.fnGetArea(0,str,dataEle,event)
    }else if(str==='city'){
      this.province['id']==''
      ?(()=>{
        obj['genre'] = 'option'
        obj['data'] = [{id:'',name:'请选择市'}]
      })()
      :this.fnGetArea(this.province['id'],str,dataEle,event)
    }else if(str==='area'){
      this.city['id']==''
      ?(()=>{
        obj['genre'] = 'option'
        obj['data'] = [{id:'',name:'请选择区'}]
      })()
      :this.fnGetArea(this.city['id'],str,dataEle,event)
    }

  	this.riccioPboxService.setSubject(obj)

  }

  /**
   * @author GR-03
   * @copyright 获取地区的接口
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {number|string=0}
   */
  public fnGetArea(parentid:number|string=0,str:string,dataEle:any,event:MouseEvent):void{
    let position = dataEle.getBoundingClientRect()
  	this.grSettingService.getConsoleArea({
  	  'parentid':parentid
  	}).subscribe(res=>{
  		if(res.status===1){
	  		this.locationData = Array.isArray(res['data'])===true?(()=>{
	  			let arr = []
	  		    res['data'].map(e=>{
	  		    	arr.push({'name':e['areaname'],'id':e['id']})
	  		    })
	  		    return [...arr]
	  		})():[]
  			
			this.riccioPboxService.setSubject({
		  		genre:'option',
		  		el:dataEle,
		  		type:str,
		  		position:{
		  			left:position.left,
		  			top:position.top,
		  			width:position.width
		  		},
		  		data:this.locationData
		  	})
  		}

  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 获取行业动态信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnShowPboxIndustry(str:string,dataEle:any,event:MouseEvent):void{
    let position = dataEle.getBoundingClientRect()
    this.riccioPboxService.setSubject({
      genre:'other',
      el:dataEle,
      type:str,
      position:{
        left:position.left,
        top:position.top,
        width:position.width
      }
    })

    this.grSettingService.getConsoleIndustry().subscribe(res=>{
      if(res.status===1){
        let industryData = Array.isArray(res['data'])===true
        ?(()=>{
          let arr = []
          res['data'].map(e=>{
            arr.push({'name':e['name'],'id':e['id']})
          })
          return [...arr]
        })()
        :[]
        this.riccioPboxService.setSubject({
            genre:'option',
            el:dataEle,
            type:str,
            position:{
              left:position.left,
              top:position.top,
              width:position.width
            },
            data:industryData
          })
      }

    },error=>{
      throw new Error(error)
    })

  }



  /**
   * @author GR-03
   * @copyright 获取企业规模信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnShowPboxScale(str:string,dataEle:any,event:MouseEvent):void{
    let position = dataEle.getBoundingClientRect()
    this.riccioPboxService.setSubject({
      genre:'other',
      el:dataEle,
      type:str,
      position:{
        left:position.left,
        top:position.top,
        width:position.width
      }
    })

    this.grSettingService.getConsoleScale().subscribe(res=>{
      if(res.status===1){
        let scaleData = Array.isArray(res['data'])===true
        ?(()=>{
          let arr = []
          res['data'].map(e=>{
            arr.push({'name':e['name'],'id':e['id']})
          })
          return [...arr]
        })()
        :[]
        this.riccioPboxService.setSubject({
            genre:'option',
            el:dataEle,
            type:str,
            position:{
              left:position.left,
              top:position.top,
              width:position.width
            },
            data:scaleData
          })
      }

    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 保存已经修改过的地区
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnSaveEdit():void{
    this.btnData.text = '保存中...'
    this.btnData.disabled = true
    this.grSettingService.postCompanyRemark({
      'industry':this.industry['id'],
      'scale':this.scale['id'],
      'location':{
        'province':this.province['id'],
        'city':this.city['id'],
        'area':this.area['id']
      }
    }).subscribe(res=>{
      this.btnData = new btnData()
      if(res.status===1){
        this.riccioNotificationsService.setSubject({text:'修改成功',status:'success'})
        this.closeView()
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 关闭视图的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public closeView():void{
    this.riccioModalService.setSubject({})
  }

}
