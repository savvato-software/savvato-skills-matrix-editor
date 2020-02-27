import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../_services/alert.service';
import { ModelService } from './_services/model.service';
import { QuestionEditService } from '../_services/question-edit.service';
import { FunctionPromiseService } from 'savvato-javascript-services'

import { environment } from '../../_environments/environment';

@Component({
  selector: 'app-question-manager',
  templateUrl: './question-manager.page.html',
  styleUrls: ['./question-manager.page.scss'],
})
export class QuestionManagerPage implements OnInit {
	funcKey = "tpqp-controller";

	constructor(private _location: Location,
		    	private _router: Router,
		    	private _route: ActivatedRoute,
				private _modelService: ModelService,
				private _alertService: AlertService,
				private _questionEditService: QuestionEditService,
				private _functionPromiseService: FunctionPromiseService
		    	) {

	}

	ionViewWillEnter() {
		this._modelService._init();
	}

	ngOnInit() {
		let self = this;

		self._modelService._init();

		self._functionPromiseService.initFunc(self.funcKey, () => {
			return new Promise((resolve, reject) => {
				resolve({
					getEnv: () => {
						return environment;
					},
					getColorMeaningString: () => {
						return "This read only view shows which cells, relatively speaking, have the most questions. Cells are colored such that, the closer you get to dark, the more questions are defined at that skill level."
					},
					getBackgroundColor: (lineItem, idx) => {

						let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
						let max = this._modelService.getHighestQuestionCountForAnyCell();

						let shadesOfGray = ["#E0E0E0","#D0D0D0","#C0C0C0","#B0B0B0","#A0A0A0","#909090","#808080","#707070","#606060", "#505050"]

						if (count && max) {
							let p = this._modelService.getPercentileForTheNumberOfQuestionsForThisCell(lineItem['id'], idx);
							let rtn = undefined;

							rtn = shadesOfGray[Math.max(p - 1, 0)];

							return rtn;
						}

						return "white";
					},
					onLxDescriptionClick: (lineItem, idx) => {
						let count = this._modelService.getQuestionCountForCell(lineItem['id'], idx);
						console.log(lineItem['id'], idx, " clicked on. count --> ", count)
						if (count > 0) {
							this._router.navigate(['/question-manager/question-list/' + lineItem['id'] + '/' + idx]);
						}
					}
				});
			});
		})
	}

	getDtimTechprofileComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { })
	}

	onNewQuestionBtnClicked() {
		console.log("CLICKED!")
		this._router.navigate(['/question-manager/question-edit/new']);
	}
}