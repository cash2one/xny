import { Component, OnInit,Input,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';

import { TreeData }			from './data'

@Component({
  selector: 'app-riccio-tree',
  templateUrl: './riccio-tree.component.html',
  styleUrls: ['./riccio-tree.component.scss']
})
export class RiccioTreeComponent implements OnInit {

  @Input() public tree:Array<any>;   //需要展示的数据
  @Input() public children:string;   //需要往下遍历的子集key值
  @Input() public name:string;       //需要显示的字段key值
  @Input() public open:boolean;      //是否默认打开
  @Input() public pbox:boolean;      //是否有下拉框给予选择
  @Input() public pboxOptions:any[]; //下拉框选项列表 
  @Input() public pboxPosition:any;  //下拉框选项的偏移量
  @Input() public icon:string;       //字体图标
  @Input() public disabledId:string|number       //需要显示禁用状态的数据ID
  @Input() public disabledChildren:boolean       //是否连同所有的子集也全部禁用
  @Input() public selectedData:any[]             //传入已经选过的数组，要求数组里面必须有唯一表示符id
  @Input() public hasChildrenNoChoose:boolean      //有子级的菜单是否点击名称就下拉而不是选中的参数
  @Output() public parentData:EventEmitter<any>;  //返回的数据
  @Output() public pboxActive:EventEmitter<any>  // 代表点击了下拉

  constructor() { 
    this.parentData = new EventEmitter<any>();
    this.pboxActive = new EventEmitter<any>();
  	this.tree     = this.tree     ?this.tree     :new TreeData().data;
  	this.children = this.children ?this.children :'chilren';
    this.name     = this.name     ?this.name     :'groupname';
    this.open     = this.open     ?this.open     :true;
    this.pbox     = this.pbox     ?this.pbox     :false;
    this.pboxOptions = this.pboxOptions?this.pboxOptions:[];
    this.pboxPosition = this.pboxPosition?this.pboxPosition:{left:false};
    this.icon     = this.icon?this.icon:'';
    this.disabledId = this.disabledId?this.disabledId:'-99999999';
    this.hasChildrenNoChoose = false
    this.disabledChildren = this.disabledChildren?this.disabledChildren:false
  }

  ngOnInit() {
  }

  ngOnChanges(change:SimpleChanges){
    this.selectedData = this.selectedData?this.selectedData:[]
    this.reorganizationData()
  }

  /**
   * @author GR-03
   * @copyright 接受子级数据然后传播到父级
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {[type]}    event [description]
   */
  public FnObtain(event):void{
    this.parentData.emit(event)
  }

  /**
   * 通知父级点击了pbox
   * @author GR-05
   */
  public fnPbox(event:any){
    this.pboxActive.emit(event)
  }

  /**
   * @author GR-03
   * @copyright 重组数据，根据disabledId和disabledChildren来判断是否禁用
   * @param     [param]
   * @return    [return]
   */
  public reorganizationData():void{
    // disabledChildren
    let treeData = this.tree
    // 遍历找出disabledId和数据的id一样的
    let fn = (data:any[])=>{

      data.map(res=>{
        /*
        判断如果匹配则执行fnChildrenDisabled方法
         */
        if(this.disabledId==res['id']&&this.disabledChildren===true){
          return this.fnChildrenDisabled(res[this.children])
        }else if(Array.isArray(res[this.children])==true){
          fn(res[this.children])
        }
        res['riccioSelected'] = false
        /*
        深度遍历，遍历出所有的子集数据id
         */
        this.findSelectedData(res)

      })

    }

    fn(treeData)

  }

  /**
   * @author GR-03
   * @copyright 找出已经选过的数据进行高亮显示
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       data  [description]
   */
  public findSelectedData(data:any):void{
    this.selectedData.map(e=>{

      if(e['id']==data['id']){
        data['riccioSelected'] = true
      }

    })

  }

  /**
   * @author GR-03
   * @copyright 为所有的子集添加禁用状态
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     data  [description]
   */
  public fnChildrenDisabled(data:any[]):void{
    data.map(e=>{
      e['riccioDisabled'] = true
      if(Array.isArray(e[this.children])==true&&e[this.children].length>0){
        this.fnChildrenDisabled(e[this.children])
      }
    })
  }

}
