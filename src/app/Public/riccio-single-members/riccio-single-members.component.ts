import { Component, OnInit,OnDestroy,Output, EventEmitter,Input,OnChanges,SimpleChanges } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { animations }  from '../.././Public/Animations/index'

@Component({
  selector: 'app-riccio-single-members',
  templateUrl: './riccio-single-members.component.html',
  styleUrls: ['./riccio-single-members.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class RiccioSingleMembersComponent implements OnInit {

  @Input() public membersList:Array<any>   //成员数据
  @Input() public isShow:boolean           //是否显示
  @Input() public nextPage:string          // loading | hide | normal  分别对应 加载中 | 隐藏 | 正常显示(加载更多)
  @Input() public keyName:string           //需要遍历的key值名称
  @Input() public header:string            //弹窗头部标题
  @Input() public title:string             //中间的标题
  @Input() public placeholder:string       //input提示

  @Output() public searchValue:EventEmitter<string>   //延迟返回搜索的值
  @Output() public pageValue:EventEmitter<any>        //点击加载更多返回页数
  @Output() public close:EventEmitter<boolean>        //是否关闭了视图
  @Output() public emitData:EventEmitter<any>         //点击成员之后发射回去的数据

  /**
   * 搜索成员的时候设定延时器防止请求多次接口
   * @type {any}
   */
  public timeOut:any

  public memberTitle: string

  /**
   * 点击加载更多的页数
   * @type {number}
   */
  public page:number

  constructor(
  ) { 
    this.header = '头部标题'
    this.title = '标题'
    this.page = 1
    this.nextPage = ''
    this.searchValue = new EventEmitter<string>()
    this.pageValue = new EventEmitter<any>()
    this.close = new EventEmitter<boolean>()
    this.emitData = new EventEmitter<any>()
    this.isShow = false
  	this.membersList = []
    this.keyName = 'real_name'
    this.memberTitle = window['setting']['sitename']
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  ngOnChanges(changes: SimpleChanges){
    this.isShow = this.isShow==true?true:(()=>{
      this.page = 1
      return false
    })()
    this.nextPage = this.nextPage?this.nextPage:'normal'
  }

  //关闭视图
  public Close():void{
    this.isShow = false
    this.close.emit(true)
  }

  /**
   * @author GR-03
   * @copyright 搜索成员的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getSearchUsers(value:string):void{
    if(this.timeOut) clearTimeout(this.timeOut)

    this.timeOut = setTimeout(()=>{
      this.searchValue.emit(value)
    },1000)

  }

  /**
   * @author GR-03
   * @copyright 点击加载更多按钮
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public more():void{
    this.nextPage = 'loading'
    this.page++
    this.pageValue.emit(this.page)
  }

  /**
   * @author GR-03
   * @copyright 点击成员后弹出发射数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       list [description]
   */
  public fnEmitTransferData(list:any):void{
    this.emitData.emit(list)
  }
  
}
