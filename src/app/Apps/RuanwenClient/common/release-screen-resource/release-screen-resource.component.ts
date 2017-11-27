import { Component, OnInit ,Output,EventEmitter,Input,OnChanges,SimpleChanges,OnDestroy} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { ReleaseScreenResourceService }		from './release-screen-resource.service'
import { GrReleaseService }			from '../../services'

import { screenResourceData }		from './screenResourceData'

@Component({
  selector: 'app-release-screen-resource',
  templateUrl: './release-screen-resource.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./release-screen-resource.component.scss']
})
export class ReleaseScreenResourceComponent implements OnInit {
   
  @Output() public emitSearchData:EventEmitter<screenResourceData>
  @Input() public page:string|number       //传递页码数字回来
  @Input() public field:string       //排序字段
  @Input() public sort:string       //正序还是倒序


  /**
   * 所有筛选的条件合集
   * @type {screenResourceData}
   */
  public searchData:screenResourceData

  /**
   * 筛选的种类个数
   * @type {any[]}
   */
  public screenItemList:any[]

  /**
   * 其他筛选的种类个数
   * @type {any[]}
   */
  public screenItemListOther:any[]

  /**
   * choose组件的标题
   * @type {string}
   */
  public chooseTitle:string

  /**
   * choose组件的值
   * @type {string}
   */
  public chooseValue:string

  /**
   * 取消选中的key值
   * @type {string}
   */
  public unChooseKey:string

  /**
   * 筛选条件数据的可订阅对象
   * @type {Subscription}
   */
  public searchDataRX$:Subscription

  constructor(
  	public releaseScreenResourceService:ReleaseScreenResourceService,
  	public grReleaseService:GrReleaseService
  ) {
    this.page = 1
    this.unChooseKey = ''
  	this.screenItemList = []
  	this.screenItemListOther = []
  	this.searchData = new screenResourceData()
    this.emitSearchData = new EventEmitter<screenResourceData>()

    this.searchDataRX$ = this.releaseScreenResourceService.getSubject().subscribe(res=>{
      this.fnEmitSearchData(res)
    })
  }

  ngOnInit() {
  	this.getScreenItemList()
  }

  ngOnChanges(change:SimpleChanges){
    // if(change['page']&&change['page']['firstChange']==false){
    //   this.fnEmitSearchData({
    //     'page':this.page
    //   })
    // }
    this.fnEmitSearchData({
      'field':this.field,
      'sort':this.sort,
      'page':this.page
    })
  }

  ngOnDestroy(){
    this.searchDataRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 向上发射筛选的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitSearchData(data:any):void{
    this.searchData = Object.assign({},this.searchData,data)

    this.searchData['page'] = data['status']?1:data['page']

    this.emitSearchData.emit(this.searchData)

  }

  /**
   * @author GR-03
   * @copyright 获取筛选的种类个数
   * @param     [param]
   * @return    [return]
   */
  public getScreenItemList():void{
  	this.grReleaseService.getRuanwenMediaSearchList().subscribe(res=>{
  		if(res.status==1){
  			this.screenItemList = [...res['data']['mediaType_api']]
  			this.screenItemListOther = [...res['data']['mediaType_sys']]
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 接收screen-type-item的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitTypeItem(data:any):void{
     this.fnEmitSearchData(data)
  }

  /**
   * @author GR-03
   * @copyright 接收screen-type-select的数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitTypeSelect(data:any):void{
     this.fnEmitSearchData(data)
  }


  /**
   * @author GR-03
   * @copyright 接收screen-type-item的数据且准备传递给choose组件显示已经选中的类型
   * @param     [param]
   * @return    [return]
   * @param     {any}       obj [description]
   */
  public fnEmitItemPassOnChoose(obj:any):void{
    this.chooseTitle = obj['title']
    this.chooseValue = obj['value']
    this.unChooseKey = obj['type']
  }

  /**
   * @author GR-03
   * @copyright 接收screen-type-select的数据且准备传递给choose组件显示已经选中的类型
   * @param     [param]
   * @return    [return]
   * @param     {any}       obj [description]
   */
  public fnEmitSelectPassOnChoose(obj:any):void{
    this.chooseTitle = obj['title']
    this.chooseValue = obj['value']
    this.unChooseKey = obj['type']
  }

  /**
   * @author GR-03
   * @copyright 接收screen-type-choose的数据来取消某个已经选择过的筛选条件
   * @param     [param]
   * @return    [return]
   * @param     {any}       obj [description]
   */
  public fnEmitUnChoose(obj:any):void{
    console.log(obj)
    this.searchData[this.unChooseKey]=''
    this.releaseScreenResourceService.setNoChoose({
      'type':'item',
      'data':obj['title']
    })
    this.fnEmitSearchData({})

    const title = obj['title']

    if(title=='新 闻 源'||title=='入口级别'||title=='可发媒体'||title=='链接类型'){
      this.releaseScreenResourceService.setNoChoose({
        'type':'select',
        'data':obj['title']
      })
    }

  }


  /**
   * @author GR-03
   * @copyright 接收头部header的tag切换的数字
   * @param     [param]
   * @return    [return]
   * @param     {number}    num [description]
   */
  public fnEmitTag(num:number):void{
    this.fnEmitSearchData({
      'status':num
    })
  }

  /**
   * @author GR-03
   * @copyright 接收头部header的搜索数据
   * @param     [param]
   * @return    [return]
   */
  public fnEmitSearch(name:string):void{
    this.fnEmitSearchData({
      'media_name':name
    })
  }

}
