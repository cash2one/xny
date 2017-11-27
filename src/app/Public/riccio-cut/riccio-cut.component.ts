import { Component, OnInit,OnDestroy,ViewChild } from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper'

import { Subscription }  from 'rxjs/Subscription'

import { RiccioCutService }		from './riccio-cut.service'

@Component({
  selector: 'app-riccio-cut',
  templateUrl: './riccio-cut.component.html',
  styleUrls: ['./riccio-cut.component.scss'],
  animations:[
  	trigger('flyInOut', [
	  state('in', style({transform: 'translateY(0)'})),
	  transition('void => *', [
	       animate(700, keyframes([
	        style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
	        style({opacity: 0.7, transform: 'translateY(25px)',  offset: 0.3}),
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0.7})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(500, keyframes([
	        style({opacity: 1, transform: 'translateY(0)',     offset: 0}),
	        style({opacity: 1, transform: 'translateY(25px)', offset: 0.5}),
	        style({opacity: 0, transform: 'translateY(-100%)',  offset: 1.0})
	      ]))
	  ])
	])
  ]
})
export class RiccioCutComponent implements OnInit {
 
  public open:boolean

  public cutRX$:Subscription

  public data1:any
  public cropperSettings1:CropperSettings
  public croppedWidth:number
  public croppedHeight:number
  
  @ViewChild('cropper') cropper:ImageCropperComponent
  @ViewChild('cropperInput') public cropperInput:any

  constructor(
  	public riccioCutService:RiccioCutService
  ) {

    this.cropperSettings1 = new CropperSettings()
    this.cropperSettings1.width = 200
    this.cropperSettings1.height = 200

    this.cropperSettings1.croppedWidth = 200
    this.cropperSettings1.croppedHeight = 200

    this.cropperSettings1.canvasWidth = 500
    this.cropperSettings1.canvasHeight = 300

    // this.cropperSettings1.minWidth = 100
    // this.cropperSettings1.minHeight = 100

    this.cropperSettings1.rounded = false
    this.cropperSettings1.keepAspect = false

    this.cropperSettings1.noFileInput = true

    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)'
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2

    this.data1 = {}

    /*
    订阅 
     */
  	this.cutRX$ = this.riccioCutService.getSubject().subscribe(res=>{
      if(Object.keys(res).length==0){
        this.Close()
      }else if(res.target.files.length>0){
        this.open = true
        this.fileChangeListener(res)
      }

  	})
  }

  ngOnInit() {
  }

  ngOnDestroy(){
  	this.cutRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 关闭视图
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public Close():void{
    this.open = false
  }


  public cropped(bounds:Bounds) {
    this.croppedHeight =bounds.bottom-bounds.top
    this.croppedWidth = bounds.right-bounds.left
  }
  
  public fileChangeListener($event) {
    var image:any = new Image()
    var file:File = $event.target.files[0]
    var myReader:FileReader = new FileReader()
    var that = this
    myReader.onloadend = function (loadEvent:any) {
        image.src = loadEvent.target.result
        that.cropper.setImage(image)
    }

    myReader.readAsDataURL(file)
  }

  /**
   * @author GR-03
   * @copyright 发射所选择的图片数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnEmitData():void{
    this.riccioCutService.setEmit({
      'data':this.cropper
    })
  }

}
