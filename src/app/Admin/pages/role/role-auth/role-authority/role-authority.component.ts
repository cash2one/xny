import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-role-authority',
  templateUrl: './role-authority.component.html',
  styleUrls: ['./role-authority.component.scss']
})
export class RoleAuthorityComponent implements OnInit {


  @Input() competenceData:any;
  @Input() constParentParent:any;

  constructor(
  ) {

   }

  ngOnInit() {
  }

}
