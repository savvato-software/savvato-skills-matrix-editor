import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { SkillsMatrixModelService } from '@savvato-software/savvato-skills-matrix-services';

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-skills-matrix-topic-edit',
  templateUrl: './skills-matrix-topic-edit-page.component.html',
  styleUrls: ['./skills-matrix-topic-edit-page.component.scss'],
})
export class SkillsMatrixTopicEditPage implements OnInit {

	dirty = false;
	topic = {id: -1, name: ''}

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _skillsMatrixModelService: SkillsMatrixModelService) {

	}

	ngOnInit() {
		let self = this;

		self._skillsMatrixModelService.setEnvironment(environment);
		self._skillsMatrixModelService._init();

		self._route.params.subscribe((params) => {
			let topicId = params['topicId'] * 1;

			if (topicId) {
				self._skillsMatrixModelService.waitingPromise().then(() => {
					self.topic = self._skillsMatrixModelService.getTopicById(topicId)
				})
			}
		})
	}

	onBackBtnClicked() { 
		let self = this;
		if (self.isDirty()) {
			self._skillsMatrixModelService.updateSkillsMatrixTopic(self.topic).then((data) => {
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
