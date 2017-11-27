import { Component, OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ViewChild,OnDestroy,Renderer2,ElementRef } from '@angular/core';

import { uedConfigToolBars }    from './uedConfig'

import { GrUeditorService }    from '../../../../ApiServices'

@Component({
  selector: 'app-ruanwen-ngxueditor',
  templateUrl: './ruanwen-ngxueditor.component.html',
  styleUrls: ['./ruanwen-ngxueditor.component.scss']
})
export class RuanwenNgxueditorComponent implements OnInit {

  @ViewChild('UedFull') public UedFull:any
  @Input() public uedContent:string
  @Input() public configType:string
  @Output() public emitData:EventEmitter<string>

  public full_source:any

  /**
   * 百度ued文本编辑器配置项
   * @type {any}
   */
  public uedConfig:any

  public isShow:boolean

  constructor(
    public grUeditorService:GrUeditorService,
    public renderer2:Renderer2,
    public el:ElementRef
  ) { 
    this.isShow = true
    this.uedContent = ""
    this.emitData = new EventEmitter<string>()

    // 百度ued基本配置项目
  	this.uedConfig = {
      toolbars:new uedConfigToolBars().data,
	    autoClearinitialContent: true,
      autoHeightEnabled: false,
      autoFloatEnabled: true,
      scaleEnabled: true,
	    wordCount: true,
      enableAutoSave: false,
      initialFrameWidth:900,
      initialFrameHeight:600,
      pageBreakTag:'———',
      serverUrl: `${window['setting']['siteurl']}ueditor?module=RuanwenClient`
    }


  }

  ngOnInit() {
    this.uedOnReady(this.UedFull)
  }

  ngOnChanges(changes:SimpleChange){
    if(changes['configType']){
      this.uedConfig['toolbars'] = new uedConfigToolBars(this.configType).data
    }
    if(changes['uedContent']){
      setTimeout(()=>{
        this.uedOnReady(this.UedFull)
      },100)
    }
  }

  ngOnDestroy(){
    let edui = document.getElementById('edui_fixedlayer')
    if(edui){
      edui.parentNode.removeChild(edui)
    }
  }
  /**
   * @author GR-03
   * @copyright 富文本编辑器准备就绪的时候触发该事件
   * @param     [param]
   * @return    [return]
   */
  public uedOnReady(emitData:any):void{
    if(emitData['Instance']){
      emitData['Instance']['body']['innerHTML'] = this.uedContent
    }
  }


  /**
   * @author GR-03
   * @copyright 监听文本改变事件
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public uedOnChange(data:any):void{
    this.emitData.emit(data)
  }

  /**
   * @author GR-03
   * @copyright 组件销毁事件
   * @param     [param]
   * @return    [return]
   */
  public uedDestroy():void{
    this.isShow = false
  }

}
