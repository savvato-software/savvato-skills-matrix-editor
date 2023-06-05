import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { SkillsMatrixModelService } from '@savvato-software/savvato-skills-matrix-services';

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-skills-matrix-line-item-edit',
  templateUrl: './skills-matrix-line-item-edit-page.component.html',
  styleUrls: ['./skills-matrix-line-item-edit-page.component.scss'],
})
export class SkillsMatrixLineItemEditPage implements OnInit {

	dirty = false;
	lineItem: any;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _skillsMatrixModelService: SkillsMatrixModelService) {

	}

	ngOnInit() {
		let self = this;

		self._skillsMatrixModelService.setEnvironment(environment);

		self._route.params.subscribe((params) => {
			let lineItemId: string = params['lineItemId'];

			if (lineItemId) {
				self._skillsMatrixModelService.waitingPromise().then(() => {
					self.lineItem = self._skillsMatrixModelService.getSkillsMatrixLineItemById(lineItemId)
				})
			}
		})
	}

	onBackBtnClicked() { 
		let self = this;
		if (self.isDirty()) {
			self._skillsMatrixModelService.updateSkillsMatrixLineItem(self.lineItem).then((data) => {
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
