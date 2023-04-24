import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

	constructor(private _location: Location,
				private _router: Router,
				private _route: ActivatedRoute,
				private _functionPromiseService: FunctionPromiseService) {

	}

  ngOnInit() {

  }
}
