import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { TechProfileModelService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../../_environments/environment'

@Component({
  selector: 'app-tech-profile-line-item-edit',
  templateUrl: './tech-profile-line-item-edit.page.html',
  styleUrls: ['./tech-profile-line-item-edit.page.scss'],
})
export class TechProfileLineItemEditPage implements OnInit {

	dirty = false;
	lineItem = {id: -1, name: '', l0Description: '', l1Description: '', l2Description: '', l3Description: ''}

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _techProfileModelService: TechProfileModelService) {

	}

	ngOnInit() {
		let self = this;

		self._techProfileModelService.setEnvironment(environment);
		self._techProfileModelService._init();

		self._route.params.subscribe((params) => {
			let lineItemId = params['lineItemId'] * 1;

			if (lineItemId) {
				self._techProfileModelService.waitingPromise().then(() => {
					self.lineItem = self._techProfileModelService.getTechProfileLineItemById(lineItemId)
				})
			}
		})
	}

	onBackBtnClicked() { 
		let self = this;
		if (self.isDirty()) {
			self._techProfileModelService.updateTechProfileLineItem(self.lineItem).then((data) => {
				self._location.back();
			})
		} else {
			self._location.back();
		}
	}

	isDirty() {
		return this.dirty;
	}

	setDirty() {
		this.dirty = true;
	}

}
