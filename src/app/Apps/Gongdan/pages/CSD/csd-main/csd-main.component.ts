import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { XnCsdServices }		from '../../../services'
import { RiccioPboxService }    from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }    from '@gr-public/riccio-notifications/riccio-notifications.service'

//某个分组下的成员列表接口对象数据
export class customerUserObj {
	'group_id': number = 0;
	'name': string = '';
}

//某个分组下的分类范围列表接口对象数据
export class classifyLimitObj {
  'id': number = 0;
  'name': string = '';
}

/*
视图需要显示的数据，包括分组名称，分组人数,添加客服右侧数据，添加客服左侧数据
 */
export class viewData {
  'groupingName': string = '';
  'groupingNumber': number = 0;
  'csdRightData': any[] = [];
  'csdLeftData': any[] = [];
  'csdIsShow': boolean = false;
  'csdNextPage': string = 'normal';  //loading | hide | normal
  'groupingTagType': string = '';
  'allIsCheck': boolean = false; // 全选按钮
}

@Component({
  selector: 'app-csd-main',
  templateUrl: './csd-main.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','./csd-main.component.scss']
})
export class CsdMainComponent implements OnInit {
  
  public customerGroupList: any[] = []  // 客服分组列表数据
  public customerGroupTableTitle : string[] = ['姓名','手机号','性别','编辑']
  public customerUserList : any[] = []   // 客服列表数据
  public classifyList: any[] = [] // 分类范围列表数据

  public customerNoAdminNumber: number = 0 // 未设置管理员的个数
  public customerUserNoGroupNumber: number = 0 // 未设置分组的成员个数

  public customerUserPostObj: customerUserObj = new customerUserObj() // 某个分组下的成员列表接口对象数据
  public classifyLimitPostObj: classifyLimitObj = new classifyLimitObj() //某个分组下的分类范围列表接口对象数据
  public viewData: viewData = new viewData()

  public tagToggle: number = 0 // 标签切换变量

  public pboxRX$: Subscription

  constructor(
  	private xnCsdServices: XnCsdServices,
    private riccioNotificationsService: RiccioNotificationsService,
    private riccioPboxService: RiccioPboxService
  ) {

    this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=> {

      let type = res['type']

      switch (type) {
        case "deleteUser":    // 删除客服人员
          (()=>{
              this.handleDeleteCsdUser( {
                'user_ids': [res['data']['id']],
                'group_id': this.customerUserPostObj['group_id']
              } )
          })()
          break;
        
        default:break;
      }

    })

  }

  ngOnInit() {
  	this.fnGetGroupingList()
    this.fnGetcustomerNoAdminNumber()
    this.fnGetcustomerUserNoGroupNumber()
  }

  ngOnDestroy() {
    this.pboxRX$.unsubscribe()
  }


  /*
  获取分组列表的函数
   */
  public fnGetGroupingList(): void {

  	this.xnCsdServices.getCustomerGroupList().subscribe(res=> {

  		if( res.status === 1 ) {
  			this.customerGroupList = Array.isArray( res['data'] ) == true ?  [...res['data']] : []
  			this.acceptGroupingData( this.customerGroupList[0] )
  		}

  	},error=> {
  		throw new Error(error)
  	})

  }

  /*
  获取没有设置管理员的成员个数函数
   */
  public fnGetcustomerNoAdminNumber(): void {

  	this.xnCsdServices.getCustomerGroupNoAdmin().subscribe(res=> {

  		if( res.status === 1 ) {
		  	this.customerNoAdminNumber = res['data']['total']
  		}

  	},error=> {
  		throw new Error(error)
  	})

  }

  /*
  获取没有设置客服分组的成员个数
   */
  public fnGetcustomerUserNoGroupNumber( id: number = 0 ): void {

    this.xnCsdServices.postCustomerNoGroup({
      'model': 'Gongdan',
      'group_id': id
    }).subscribe(res=> {

      if( res.status === 1 ) {

        if( id == 0 ){
          this.customerUserNoGroupNumber = res['data']['total']
        }else {
          this.viewData['csdLeftData'] = Array.isArray( res['data']['data'] ) == true ? [...this.viewData['csdLeftData'],...res['data']['data']] : []
        }

      }

    },error=> {
      throw new Error(error)
    })

  }

  /*
  获取某个分组下的客服人员列表数据
   */
  public fnGetCustomerUserList( obj: customerUserObj, rows: number = 20 ) : void {

  	this.xnCsdServices.postCustomerUser({
  		...obj,
      'rows':rows
  	}).subscribe(res=> {

  		if(res.status === 1) {

        if( rows == 1000 ) {
          this.viewData['csdRightData'] = Array.isArray( res['data']['data'] ) == true ? [...res['data']['data']] : []
        }else {
          this.customerUserList = Array.isArray( res['data']['data'] ) == true ? [...res['data']['data']] : []
          this.viewData['groupingNumber'] = res['data']['total']
        }
  		}

  	},error=> {
  		throw new Error(error)	
  	})

  }

  /*
  获取某个分组下的分类范围数据的函数
   */
  public fnGetClassifyList( obj: classifyLimitObj ) : void {

    this.xnCsdServices.getCustomerGroupClass({
      ...obj
    }).subscribe(res=> {

      if(res.status === 1) {
        this.classifyList = Array.isArray( res['data']['data'] ) == true ? [...res['data']['data']] : []
      }

    },error=> {
      throw new Error(error)  
    })

  }

  /*
  接受客服分组发射回来的数据
   */
  public acceptGroupingData( data: any ) : void {
    // 切换回正常视图
    this.viewData['groupingTagType'] = ''
    // 客服列表对象
  	this.customerUserPostObj['group_id'] = data['id']
    this.viewData['groupingName'] = data['name']

    // 分类范围对象
    this.classifyLimitPostObj['id'] = data['id']

  	this.fnGetCustomerUserList( this.customerUserPostObj )
    this.initClassifyList()
  }


  /*
  点击分类范围获取列表函数
   */
  public initClassifyList(): void {
    this.fnGetClassifyList( this.classifyLimitPostObj )
  }

  /*
  点击添加客服的函数
   */
  public fnAddCsdMember() : void {

    this.viewData['csdIsShow'] = true
    // 获取右侧数据
    this.fnGetCustomerUserList( this.customerUserPostObj, 1000 )
    // 获取左侧数据
    this.fnGetcustomerUserNoGroupNumber( this.customerUserPostObj['group_id'] )

  }

  /*
  移除某一个客服人员的函数
   */
  public fnRemoveCsdPbox( data: any, el: any ) : void {

    let client = this.handleElementPosition( el )

    this.riccioPboxService.setSubject({
      'genre': 'delete',
      'el': el,
      'type': 'deleteUser',
      'position': {
        'left': client.x,
        'top': client.y,
        'width': 300
      },
      'data': {
        'title':'删除提示',
        'content':'是否删除该客服',
        'button':'确认',
        'delID': data
      }
    })

  }

  /*
  获取元素相对于浏览器的位置
   */
  public handleElementPosition( data : any ) : any {
    return data.getBoundingClientRect()
  }

  /*
  处理确认删除客服人员后需要提交的数据接口函数
   */
  public handleDeleteCsdUser( obj: any ) : void {

    this.xnCsdServices.postCustomerDel({
      ...obj
    }).subscribe(res=> {

      if( res.status === 1 ) {
        this.riccioNotificationsService.setSubject({text:'删除成功'})
        // this.customerUserList = this.customerUserList.filter(_e => _e['id'] != obj[''])
        this.fnGetCustomerUserList( this.customerUserPostObj )
        this.fnGetcustomerUserNoGroupNumber( 0 )
      }

    },error=> {
      throw new Error(error) 
    })

  } 

  /*
  添加客服返回的所有右边要添加的客服人员数据函数
  添加客服函数
   */
  public acceptAddCsdData( data: any ) : void {

    if( data.length>0 ){
      this.xnCsdServices.postCustomerAdd({
        'user_ids': data.map(_e => _e['id']),
        'group_id': this.customerUserPostObj['group_id']
      }).subscribe(res=> {

        if( res.status === 1 ) {
          this.riccioNotificationsService.setSubject({text:'添加成功'})
          this.fnGetCustomerUserList( this.customerUserPostObj )
          this.fnGetcustomerUserNoGroupNumber( 0 )
        }

      },error=> {
        throw new Error(error)        
      })
    }
    

  }


  /*
  接受客服分组上面两个分组的点击事件
   */
  public acceptGroupingType( type: string ) : void {

    switch (type) {
      case "first":
        this.viewData['groupingTagType'] = type
        break;
      
      case "second":
        this.viewData['groupingTagType'] = type
        break;

      default: break;
    }

  }

}
