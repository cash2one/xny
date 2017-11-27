import { OnDestroy,Component, OnInit,Input,OnChanges,SimpleChanges,Output,EventEmitter } from '@angular/core'

import { RiccioSelectMembersService }			from './riccio-select-members.service' 
import { RiccioTreeDepartmentService }  from '../riccio-tree-department/riccio-tree-department.service'

import { RiccioSelectData }      from './Data'
import { loadingData }    from './loadingData'

import { animations }  from '../.././Public/Animations/index'


@Component({
  selector: 'app-riccio-select-members',
  templateUrl: './riccio-select-members.component.html',
  styleUrls: ['./riccio-select-members.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class RiccioSelectMembersComponent implements OnInit {

  @Input() public leftData:Array<any>    //左侧待选择的数据成员
  @Input() public rightData:Array<any>   //右侧已选择的数据成员
  @Input() public isShow:boolean    //是否显示
  @Input() public nextPage:string   // loading | hide | normal  分别对应 加载中 | 隐藏 | 正常显示(加载更多)
  @Input() public keyName:string    //需要遍历的key值名称
  @Input() public leftTitle:string    //左侧头部标题
  @Input() public rightTitle:string    //右侧头部标题
  @Input() public header:string    //头部标题

  @Output() public searchValue:EventEmitter<string>   //延迟返回搜索的值
  @Output() public emitData:EventEmitter<any>         //点击保存返回右侧所有数据  
  @Output() public pageValue:EventEmitter<any>    //点击加载更多返回页数
  @Output() public close:EventEmitter<boolean>        //是否关闭了视图

  /**
   * 搜索成员的时候设定延时器防止请求多次接口
   * @type {any}
   */
  public timeOut:any

  /**
   * 点击加载更多的页数
   * @type {number}
   */
  public page:number

  constructor(
  	public riccioSelectMembersService:RiccioSelectMembersService,
    public riccioTreeDepartmentService:RiccioTreeDepartmentService
  ) { 
    this.page = 1
    this.nextPage = ''
    this.searchValue = new EventEmitter<string>()
    this.emitData = new EventEmitter<any>()
    this.pageValue = new EventEmitter<any>()
    this.close = new EventEmitter<boolean>()
    this.isShow = false
  	this.leftData = []
  	this.rightData = []
    this.header = '选择成员'
    this.leftTitle = '成员'
    this.rightTitle = '已选择成员'
    this.keyName = 'real_name'
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  }

  ngOnChanges(changes: SimpleChanges){
    this.leftData = this.leftData?this.leftData:[]
    this.rightData = this.rightData?this.rightData:[]
    this.isShow = this.isShow==true?true:(()=>{
      this.page = 1
      return false
    })()
    this.nextPage = this.nextPage?this.nextPage:'normal'

    this.handleRepeatData()

  }

  //点击保存之后将右边的数据发射给调用该组件的父级组件
  public FnSaveSelect():void{

    this.Close()
    this.emitData.emit(this.rightData)

  }


  //处理右边成员的方法
  public FnRightData(list:any):void{

    this.rightData = this.rightData.filter(e=>e['id']!=list['id'])

    this.leftData.push(list)

  }

  //处理左边成员的方法
  public FnLeftData(list:any):void{
    
    this.leftData = this.leftData.filter(e=>e['id']!=list['id'])

    this.rightData.push(list)

  }


  //添加全部的方法
  public FnAddAll():void{
    this.rightData = [...this.rightData,...this.leftData]
    this.leftData.length=0
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
   * @copyright 处理重复的数据
   * @param     [param]
   * @return    [return]
   */
  public handleRepeatData():void{
    let length = this.rightData.length
    for(let i = 0;i<length;i++){
      this.leftData = this.leftData.filter(e=>e['id']!=this.rightData[i]['id'])
    }
  }


}
