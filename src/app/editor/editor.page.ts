import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import { AlertService } from '../_services/alert.service';
import { TechProfileModelService } from '../_services/tech-profile-model.service';

import { UP, DOWN } from '../../_constants/constants';

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-editor',
  templateUrl: './editor.page.html',
  styleUrls: ['./editor.page.scss'],
})
export class EditorPage implements OnInit {

	constructor(private _location: Location,
		private _router: Router,
		private _route: ActivatedRoute,
		private _techProfileModelService: TechProfileModelService,
		private _alertService: AlertService,
		private _functionPromiseService: FunctionPromiseService) {

	}

	funcKey = "tpepg-controller";

	selectedTopicIDsProvider = () => { return [] };
	selectedLineItemIDsProvider = () => { return [] };
	techProfileProvider = () => { return undefined };

	ngOnInit() {
		let self = this;
		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getTechProfileModelService: () => {
						return self._techProfileModelService;
					},
					setProviderForSelectedTopicIDs: (func) => {
						// called by the techprofile component to give us a function
						self.selectedTopicIDsProvider = func;
					},
					setProviderForSelectedLineItemIDs: (func) => {
						// called by the techprofile component to give us a function
						self.selectedLineItemIDsProvider = func;
					},
					getColorMeaningString: () => {
						return "Red means selected. Selected means you can edit it!"
					},
					getTopicBackgroundColor: (topic, isSelected) => {
						return isSelected ? "red" : undefined;
					},
					getLineItemBackgroundColor: (lineItem, isSelected) => {
						return isSelected ? "red" : undefined;
					},
				});
			})
		});
	}

	ionViewDidLeave() {
		this._techProfileModelService.saveSequenceInfo().then(() => {
			// do  nothing
		});
	}

	ngOnDestroy() {
		this._functionPromiseService.resetFunc(this.funcKey);
		this._functionPromiseService.reset(this.funcKey);
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	};

	onNewTopicBtnClicked() {
		let self = this;
		self._alertService.show({
			header: 'New Topic!',
			message: "Enter the new topic name:",
			inputs: [{
				name: 'topicName',
				placeholder: '....',
				type: 'text'
			}],			
			buttons: [{
				text: 'Cancel', 
				handler: (data) => {
					// do nothing.. ?
				}
			},{
				text: 'OK', 
				handler: (data) => {
					if (data.topicName && data.topicName.length >= 2) {
						self._techProfileModelService.saveSequenceInfo().then(() => {
							self._techProfileModelService.addTopic(data.topicName).then(() => {
								// do nothing
							});
						});

					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isNewLineItemBtnAvailable() {
		return this.selectedTopicIDsProvider().length > 0
	}

	onNewLineItemBtnClicked() {
		let self = this;
		self._alertService.show({
			header: 'New Line Item!',
			message: "Enter the new Line Item name:",
			inputs: [{
				name: 'lineItemName',
				placeholder: '....',
				type: 'text'
			}],			
			buttons: [{
				text: 'Cancel', 
				handler: (data) => {
					// do nothing.. ?
				}
			},{
				text: 'OK', 
				handler: (data) => {
					if (data.lineItemName && data.lineItemName.length >= 2) {
						self._techProfileModelService.saveSequenceInfo().then(() => {
							self._techProfileModelService.addLineItem(self.selectedTopicIDsProvider()[0], data.lineItemName).then(() => {
								// do nothing
							});
						});
						
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isSelectedTopicAbleToMoveUp() {
		return this._techProfileModelService.isTopicAbleToMoveUp(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicUpClicked() {
		console.log(this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDsProvider()[0], UP))
	}

	isSelectedTopicAbleToMoveDown() {
		return this._techProfileModelService.isTopicAbleToMoveDown(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicDownClicked() {
		console.log(this._techProfileModelService.moveSequenceForTechProfileTopic(this.selectedTopicIDsProvider()[0], DOWN))
	}

	isSelectedLineItemAbleToMoveUp() {
		return this._techProfileModelService.isLineItemAbleToMoveUp(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemUpClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], UP)	
	}

	isSelectedLineItemAbleToMoveDown() {
		return this._techProfileModelService.isLineItemAbleToMoveDown(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemDownClicked() {
		this._techProfileModelService.moveSequenceForTechProfileLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], DOWN)
	}

	isEditTopicBtnAvailable() {
		return this.selectedTopicIDsProvider().length > 0;
	}

	onEditTopicBtnClicked() {
		this._router.navigate(['/editor/tech-profile-topic-edit/' + this.selectedTopicIDsProvider()[0]]);
	}

	isEditLineItemBtnAvailable() {
		return this.selectedLineItemIDsProvider().length > 0;
	}

	onEditLineItemBtnClicked() {
		this._router.navigate(['/editor/tech-profile-line-item-edit/' + this.selectedLineItemIDsProvider()[0]]);
	}

	onFinishedEditingBtnClicked() {
		this._router.navigate(['/display']);
	}

}
