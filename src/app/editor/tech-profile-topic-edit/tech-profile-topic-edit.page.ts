import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { TechProfileModelService } from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Component({
  selector: 'app-tech-profile-topic-edit',
  templateUrl: './tech-profile-topic-edit.page.html',
  styleUrls: ['./tech-profile-topic-edit.page.scss'],
})
export class TechProfileTopicEditPage implements OnInit {

	dirty = false;
	topic = {id: -1, name: ''}

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
			let topicId = params['topicId'] * 1;

			if (topicId) {
				self._techProfileModelService.waitingPromise().then(() => {
					self.topic = self._techProfileModelService.getTopicById(topicId)
				})
			}
		})
	}

	onBackBtnClicked() { 
		let self = this;
		if (self.isDirty()) {
			self._techProfileModelService.updateTechProfileTopic(self.topic).then((data) => {
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
