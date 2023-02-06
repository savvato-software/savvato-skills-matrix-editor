import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	constructor(private _location: Location,
				private _router: Router,
				private _route: ActivatedRoute,
				private _functionPromiseService: FunctionPromiseService) {

	}

  funcKey = "tp-controller-1xz3-alpha";

  refreshChildComponentFunc:() => any = () => {};

  ngOnInit() {
    let self = this;

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getColorMeaningString: () => {
						return "This is the read only view of the Tech Profile."
					},
					setRefreshFunc: (cb) => {
						// this function is called by the component. The parameter is a function that it creates.
						//  we call this parameter function to let the component know that it should refresh its data.
						self.refreshChildComponentFunc = cb;
					}
				});
			})
		});
  }

  ionViewWillEnter() {
    if (this.refreshChildComponentFunc)
      this.refreshChildComponentFunc();
  }

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  onEditBtnClicked() {
		this._router.navigate(['/editor/']);
  }
}
