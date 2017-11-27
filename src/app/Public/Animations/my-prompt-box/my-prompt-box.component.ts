import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-prompt-box',
  templateUrl: './my-prompt-box.component.html',
  styleUrls: ['./my-prompt-box.component.css']
})
export class MyPromptBoxComponent implements OnInit {

	@Input() showBoxText:string;

  constructor() { }

  ngOnInit() {

  }

}
