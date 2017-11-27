import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['../../Admin.component.scss','./project.component.scss']
})
export class ProjectComponent implements OnInit {

	public MenuTitle:string;

	constructor() {
	}

  ngOnInit() {
  }


}
