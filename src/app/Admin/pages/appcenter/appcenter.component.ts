import { Component, OnInit } from '@angular/core';

import { AppcenterService } from './appcenter.service'

@Component({
  selector: 'app-appcenter',
  templateUrl: './appcenter.component.html',
  styleUrls: ['./appcenter.component.scss']
})
export class AppcenterComponent implements OnInit {
  

  constructor(
    public appcenterService:AppcenterService
  ) { }

  ngOnInit() {
  }

}
