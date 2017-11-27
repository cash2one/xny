import { Component, OnInit,Input,OnChanges,SimpleChange ,DoCheck} from '@angular/core';

import { PersonalService }                   from '../../../Public/Personal/personal.service';
import { MyPromptSmallService }              from './my-prompt-small.service'

import { animations }			from '../index'

@Component({
  selector: 'app-my-prompt-small',
  templateUrl: './my-prompt-small.component.html',
  styleUrls: ['./my-prompt-small.component.css'],
  animations:[
    animations.shake,
    animations.flyIn
  ]
})
export class MyPromptSmallComponent implements OnInit {


  @Input() PromptSmall;

  constructor(
  	 public personalService:PersonalService,
     public myPromptSmallService:MyPromptSmallService
  	) { }

  ngOnInit() {

  }

  ngOnChanges(change:SimpleChange){
    
    this.PromptSmall = (()=>{

      return this.personalService.PromptSmall
      
    })();

    // setTimeout(()=>{console.log(this.personalService.PromptSmall)},2000)
  }

}
