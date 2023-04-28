import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import { AlertService } from '../_services/alert.service';
import { SkillsMatrixModelService } from '@savvato-software/savvato-skills-matrix-services';

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
		private _skillsMatrixModelService: SkillsMatrixModelService,
		private _alertService: AlertService,
		private _functionPromiseService: FunctionPromiseService) {

	}

	funcKey = "smepg-controller";

	selectedTopicIDsProvider = () => { return [] };
	selectedLineItemIDsProvider = () => { return [] };
	selectedLevelIDProvider = () => { return -1; }

	ngOnInit() {
		let self = this;

		self._skillsMatrixModelService.setEnvironment(environment);

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getSkillsMatrixModelService: () => {
						return self._skillsMatrixModelService;
					},
					setProviderForSelectedTopicIDs: (func) => {
						// called by the skillsmatrix component to give us a function
						self.selectedTopicIDsProvider = func;
					},
					setProviderForSelectedLineItemIDs: (func) => {
						// called by the skillsmatrix component to give us a function
						self.selectedLineItemIDsProvider = func;
					},
					setProviderForSelectedLevelID: (func) => {
						// called by the skillsmatrix component to give us a function
						self.selectedLevelIDProvider = func;
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
					getSkillBackgroundColor: (lineItem, skill, isSelected) => {
						return isSelected ? "red" : undefined;
					}
				});
			})
		});
	}

	ngOnDestroy() {
		this._functionPromiseService.resetFunc(this.funcKey);
		this._functionPromiseService.reset(this.funcKey);
	}

	getSkillsMatrixComponentController() {
		return this._functionPromiseService.getUsingAPromise(this.funcKey, this.funcKey, { });
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
						self._skillsMatrixModelService.saveSequenceInfo().then(() => {
							self._skillsMatrixModelService.addTopic(data.topicName).then(() => {
								// do nothing
							});
						});
            return true;
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
						self._skillsMatrixModelService.saveSequenceInfo().then(() => {
							self._skillsMatrixModelService.addLineItem(self.selectedTopicIDsProvider()[0], data.lineItemName).then(() => {
								// do nothing
							});
						});
						return true;
					} else {
						return false; // disable the button
					}
				}
			}
			]
		})
	}

	isSelectedTopicAbleToMoveUp() {
		return this._skillsMatrixModelService.isTopicAbleToMoveUp(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicUpClicked() {
		console.log(this._skillsMatrixModelService.moveSequenceForSkillsMatrixTopic(this.selectedTopicIDsProvider()[0], UP))
	}

	isSelectedTopicAbleToMoveDown() {
		return this._skillsMatrixModelService.isTopicAbleToMoveDown(this.selectedTopicIDsProvider()[0]);
	}

	onMoveTopicDownClicked() {
		console.log(this._skillsMatrixModelService.moveSequenceForSkillsMatrixTopic(this.selectedTopicIDsProvider()[0], DOWN))
	}

	isSelectedLineItemAbleToMoveUp() {
		return this._skillsMatrixModelService.isLineItemAbleToMoveUp(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemUpClicked() {
		this._skillsMatrixModelService.moveSequenceForSkillsMatrixLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], UP)
	}

	isSelectedLineItemAbleToMoveDown() {
		return this._skillsMatrixModelService.isLineItemAbleToMoveDown(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	onMoveLineItemDownClicked() {
		this._skillsMatrixModelService.moveSequenceForSkillsMatrixLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0], DOWN)
	}

	isEditTopicBtnAvailable() {
		return this.selectedTopicIDsProvider().length > 0;
	}

	onEditTopicBtnClicked() {
		this._router.navigate(['/editor/skills-matrix-topic-edit/' + this.selectedTopicIDsProvider()[0]]);
	}

	isEditLineItemBtnAvailable() {
		return this.selectedLineItemIDsProvider().length > 0;
	}

	onEditLineItemBtnClicked() {
		this._router.navigate(['/editor/skills-matrix-line-item-edit/' + this.selectedLineItemIDsProvider()[0]]);
	}

	onFinishedEditingBtnClicked() {
		this._skillsMatrixModelService.saveSequenceInfo().then(() => {
			this._router.navigate(['/display']);
		});
	}

	isCopyLineItemBtnAvailable() {
		let rtn = false;
		let selectedTopicIDs = this.selectedTopicIDsProvider();
		if (selectedTopicIDs && selectedTopicIDs.length === 1) {
			let lineItems = this._skillsMatrixModelService.getLineItemsForATopic(selectedTopicIDs[0]);

			let selectedLineItemIDs = this.selectedLineItemIDsProvider();

			if (selectedLineItemIDs.length === 1 && lineItems)
				rtn = !lineItems.map(li => li['id']).includes(selectedLineItemIDs[0]);
		}

		return rtn;
	}

	onCopyLineItemBtnClicked() {
		this._skillsMatrixModelService.addExistingLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	isDeleteLineItemBtnAvailable() {
		let rtn = false;
		let selectedTopicIDs = this.selectedTopicIDsProvider();
		if (selectedTopicIDs && selectedTopicIDs.length === 1) {
			let lineItems = this._skillsMatrixModelService.getLineItemsForATopic(selectedTopicIDs[0]);

			let selectedLineItemIDs = this.selectedLineItemIDsProvider();

			if (selectedLineItemIDs.length === 1 && lineItems)
				rtn = lineItems.map(li => li['id']).includes(selectedLineItemIDs[0]);
		}

		return rtn;
	}

	onDeleteLineItemBtnClicked() {
		this._skillsMatrixModelService.deleteExistingLineItem(this.selectedTopicIDsProvider()[0], this.selectedLineItemIDsProvider()[0]);
	}

	isEditSkillsBtnAvailable() {
		return this.selectedLineItemIDsProvider().length > 0;
	}

	onEditSkillsBtnClicked() {
		this._router.navigate(['/editor/skills-matrix-line-item-skills-edit/' + this.selectedLineItemIDsProvider()[0]]);
	}
}
