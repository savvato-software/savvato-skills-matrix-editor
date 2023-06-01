import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { LoadingService } from "../_services/loading.service";

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

@Component({
  selector: 'app-display',
  templateUrl: './display.page.html',
  styleUrls: ['./display.page.scss'],
})
export class DisplayPage implements OnInit {

	skillsMatrixId: string = '';

	constructor(private _location: Location,
				private _router: Router,
				private _route: ActivatedRoute,
				private _loadingService: LoadingService,
				private _functionPromiseService: FunctionPromiseService,
				private _skillsMatrixModelService: SkillsMatrixModelService) {

	}

	funcKey = "tp-controller-1xz3-alpha";

	skillLineItemBackgroundColorMap: Array<object> = [];

	refreshChildComponentFunc:() => any = () => {};

	ngOnInit() {
    	let self = this;

		self._route.params.subscribe((params) => {
	  		self.skillsMatrixId = params['skillsMatrixId'];
		})

		self._skillsMatrixModelService.setEnvironment(environment);

		self._functionPromiseService.reset(self.funcKey);

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					// getEnv: () => {
					// 	return environment;
					// },
					// getSkillsMatrixId: () => {
					// 	console.log("*** skillsMatrixId = " + self.skillsMatrixId)
					// 	return self.skillsMatrixId;
					// },
					initModelService: () => {
						return new Promise((resolve, reject) => {
							console.log("*** initializing skills matrix model service")
							self._skillsMatrixModelService._init(self.skillsMatrixId, true)

							self._skillsMatrixModelService.waitUntilAvailable().then(() => {
								console.log("*** skills matrix model service is available")
								resolve(true);
							});
						});
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
						return "This is the read only view of the Skills Matrix."
					},
					setRefreshFunc: (cb) => {
						// this function is called by the component. The parameter is a function that it creates.
						//  we call this parameter function to let the component know that it should refresh its data.
						self.refreshChildComponentFunc = cb;
					},
					getSkillBackgroundColor: (lineItem, skill, index) => {
						if (skill['detailLineItemId']) {
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
							if (index % 2 == 0)
								return "white";
							else
								return "lightgray";
						}
					},
					getLineItemBackgroundColor: (lineItem) => {
						let item = this.skillLineItemBackgroundColorMap.find((item) => {
							return item['lineItemId'] == lineItem.id;
						});
						if (item) {
							return item['color'];
						}

						// TODO: again, I would like to defer to the component here, See above
						return "white";
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

	ionViewWillEnter() {
    	if (this.refreshChildComponentFunc)
      		this.refreshChildComponentFunc();
	}

	getSkillsMatrixComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  	}

  	onEditBtnClicked() {
		this._router.navigate(['/editor/' + this.skillsMatrixId]);
  	}

  	onListPageBtnClicked() {
  		this._router.navigate(['/list/'])
  	}

	onExportBtnClicked() {
		this._router.navigate(['/export']);
	}
}
