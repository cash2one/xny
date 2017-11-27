import { Component, OnInit,Input,ElementRef,OnDestroy,Output,EventEmitter,OnChanges,SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription'

import { RiccioPboxService }		from '@gr-public/riccio-pbox/riccio-pbox.service' 
import { ReleaseScreenResourceService }    from '../release-screen-resource.service'

@Component({
  selector: 'app-screen-type-select',
  templateUrl: './screen-type-select.component.html',
  styleUrls: ['./screen-type-select.component.scss']
})
export class ScreenTypeSelectComponent implements OnInit {
 
  @Input() public itemList:any[]
  @Output() public emitSelectData:EventEmitter<any>
  @Output() public emitChoose:EventEmitter<any>

  /**
   * 订阅pbox组件的数据
   * @type {Subscription}
   */
  public pboxSubject$:Subscription

  public noChooseRX$:Subscription

  /**
   * 默认需要显示的其它类型文本名称
   * @type {string[]}
   */
  public chooseText:string[]

  constructor(
  	public riccioPboxService:RiccioPboxService,
    public releaseScreenResourceService:ReleaseScreenResourceService
  ) { 
    this.emitSelectData = new EventEmitter<any>()


    this.noChooseRX$ = this.releaseScreenResourceService.getNoChoose().subscribe(res=>{
      if(res['type']=='select'){
        this.handleNoChoose(res)
      }
    })

    /**
     * 传递对象格式为{title:'',value:''}
     * @type {EventEmitter}
     */
  	this.emitChoose = new EventEmitter<any>()

  	this.pboxSubject$ = this.riccioPboxService.getEmit().subscribe(res=>{

      if(res['type']!=='close'){

        let index = res['type']==''?0:res['type']
        this.itemList[index]['media_name'] = res['data']['name']

        let obj = {}
        switch (index) {
          case 0:
            obj = { 'media_news':res['data']['id'] }
            break;
          
          case 1:
            obj = { 'media_inlevel':res['data']['id'] }
            break;

          case 2:
            obj = { 'media_issue':res['data']['id'] }
            break;

          case 3:
            obj = { 'media_link':res['data']['id'] }
            break;

          default:break;
        }
        this.emitSelectData.emit(obj)
        this.emitChoose.emit({
          'title':this.chooseText[index],
          'value':res['data']['name'],
          'type':Object.keys(obj)[0]
        })

      }

  	})

  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	this.pboxSubject$.unsubscribe()
  }

  ngOnChanges(change:SimpleChanges){
    if(change['itemList']) this.fnChooseTextArr()
  }
  
  /**
   * @author GR-03
   * @copyright 处理取消掉的选项还原到初始状态
   * @param     [param]
   * @return    [return]
   */
  public handleNoChoose(obj:any):void{
    const title = obj['data']

    switch (title) {
      case "新 闻 源":
        this.itemList[0]['media_name'] = title
        break;
      
      case "入口级别":
        this.itemList[1]['media_name'] = title
        break;

      case "可发媒体":
        this.itemList[2]['media_name'] = title
        break;

      case "链接类型":
        this.itemList[3]['media_name'] = title
        break;

      default:break;
    }

  }

  /**
   * @author GR-03
   * @copyright 保存已选中的其它类型标题名称
   * @param     [param]
   * @return    [return]
   */
  public fnChooseTextArr():void{
    this.chooseText = Array.isArray(this.itemList)===true?(()=>{
      let arr = []

      arr = this.itemList.map(e=>e['media_name'])

      return arr
    })():[]
  }


  /**
   * @author GR-03
   * @copyright 接收select-single组件的数据用来显示对应的pbox数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnGetEmitSingle(data:any):void{
  	this.riccioPboxService.setSubject({...data})
  }


}
