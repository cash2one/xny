import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-no-admin',
  templateUrl: './group-no-admin.component.html',
  styleUrls: ['../../../../../../Public/theme/apps-common/common.scss',
              '../../../../../../Public/theme/apps-common/table.scss',
              './group-no-admin.component.scss']
})
export class GroupNoAdminComponent implements OnInit {

  public noAdminTableTitle: string[] = ['姓名','手机号','性别','编辑']

  constructor() { }

  ngOnInit() {
  }

}
