import { Component, OnInit ,OnChanges ,Input} from '@angular/core'

import { animations }              from '../index'

@Component({
  selector: 'app-my-elastic-layer',
  templateUrl: './my-elastic-layer.component.html',
  styleUrls: ['./my-elastic-layer.component.css'],
  animations: [
  	animations.flyIn,
  	animations.fadeIn
  ]
})
export class MyElasticLayerComponent implements OnInit {

  @Input() showElasticData;

  public PromptSmall:any
  public showSmallText          : string;
  public ViewData:any
  public showcover = false;

  constructor() {
  }

  ngOnInit() { 

  }

  ngOnChanges(){   

  }
  // 关闭按钮
  public closeBox():void{
    this.showElasticData = !this.showElasticData;
  }

}
