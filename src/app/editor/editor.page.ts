import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import {LoadingService} from "../_services/loading.service";
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
		private _loadingService: LoadingService,
		private _functionPromiseService: FunctionPromiseService) {

	}

	funcKey = "smepg-controller";

	selectedTopicIDsProvider = () => { return [] };
	selectedLineItemIDsProvider = () => { return [] };
	selectedLevelIDProvider = () => { return -1; }

	skillsMatrixId: string = '';

	skillLineItemBackgroundColorMap: Array<object> = [];

	ngOnInit() {
		let self = this;

		self._route.params.subscribe((params) => {
			self.skillsMatrixId = params['skillsMatrixId'];
		})

		self._skillsMatrixModelService.setEnvironment(environment);

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					isEditor: () => {
						return true;
					},
					// getEnv: () => {
					// 	return environment;
					// },
					// getSkillsMatrixId: () => {
					// 	return self.skillsMatrixId;
					// },
					// getSkillsMatrixModelService: () => {
					// 	return self._skillsMatrixModelService;
					// },
					initModelService: () => {
						return new Promise((resolve, reject) => {
							self._skillsMatrixModelService._init(self.skillsMatrixId, true)

							self._skillsMatrixModelService.waitUntilAvailable().then(() => {
								resolve(true);
							});
						});
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
					getName: (skillsMatrixId: string) => {
						return self._skillsMatrixModelService.getName(skillsMatrixId);
					},
					getSkillsMatrixes: () => {
						return self._skillsMatrixModelService.getSkillsMatrixes();
					},
					getTopics: (skillsMatrixId: string) => {
						return self._skillsMatrixModelService.getTopics(skillsMatrixId);
					},
					getLineItemsByTopic: (topic: any) => {
						return self._skillsMatrixModelService.getLineItemsForATopic(topic['id']);
					},
					getSkillsByLineItemAndLevel: (lineItem: any, level: number) => {
						return self._skillsMatrixModelService.getSkillsForALineItemAndLevel(lineItem, level);
					},
					getColorMeaningString: () => {
						return "Red means selected. Selected means you can edit it!"
					},
					getTopicBackgroundColor: (topic, isSelected) => {
						return isSelected ? "red" : undefined;
					},
					getLineItemBackgroundColor: (lineItem, isSelected) => {
						if (isSelected)
							return "red";

						let item = this.skillLineItemBackgroundColorMap.find((item) => {
							return item['lineItemId'] == lineItem.id;
						});
						if (item) {
							return item['color'];
						}

						// TODO: again, I would like to defer to the component here, See below.
						return "white";
					},
					getSkillBackgroundColor: (lineItem, skill, index, isSelected) => {
						if (isSelected)
							return "red";
						else if (skill['detailLineItemId']) {
							let item = self.skillLineItemBackgroundColorMap.find((item) => {
								return item['lineItemId'] == skill['detailLineItemId'];
							});
							if (item) {
								return item['color'];
							} else {
								let obj = {
									lineItemId: skill['detailLineItemId'],
									color: self.getUniqueColor(this.skillLineItemBackgroundColorMap),
									skillId: skill.id
								};
								self.skillLineItemBackgroundColorMap.push(obj);

								return obj['color'];
							}
						} else {
							// TODO: I'd prefer some way to default to the component, as in "If our condition
							//  doesn't apply, then let the component decide what to do." As it is now, this
							//  bit of code is copy pasta'd from the component.

							// TODO Perhaps return undefined?

							if (index % 2 == 0)
								return "white";
							else
								return "lightgray";
						}
					},
					skillsMatrixComponentFinishedLoadingEventHandler: (data) => {
						self._loadingService.dismiss();
					}
				});
			})
		});

		self._loadingService.show({message: "..loading.."});
	}

	getUniqueColor(skillLineItemColorItems: Array<object>) {
		let color = this.getRandomColor();
		let found = skillLineItemColorItems.find((item) => {
			return item['color'] == color;
		});
		if (found) {
			return this.getUniqueColor(skillLineItemColorItems);
		}
		return color;
	}

	getRandomColor() {
		let letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++)
			color += letters[Math.floor(Math.random() * 16)];
		return color;
	}

	ngOnDestroy() {
		this._functionPromiseService.resetFunc(this.funcKey);
		this._functionPromiseService.reset(this.funcKey);
	}

	getSkillsMatrixComponentController() {
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
						self._skillsMatrixModelService.saveSequenceInfo().then(() => {
							self._skillsMatrixModelService.addTopic(self.skillsMatrixId, data.topicName).then(() => {
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
			this._router.navigate(['/display/' + this.skillsMatrixId]);
		});
	}

	isCopyLineItemBtnAvailable() {
		let rtn = false;
		let selectedTopicIDs = this.selectedTopicIDsProvider();
		if (selectedTopicIDs && selectedTopicIDs.length === 1) {
			let lineItems: any = this._skillsMatrixModelService.getSkillsMatrixLineItemsByTopic(selectedTopicIDs[0]);

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
			let lineItems: any = this._skillsMatrixModelService.getSkillsMatrixLineItemsByTopic(selectedTopicIDs[0]);

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

	onEditMatrixBtnClicked() {
		this._router.navigate(['/editor/skills-matrix-edit/' + this.skillsMatrixId]);
	}
}
