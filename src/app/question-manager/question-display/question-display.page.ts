import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import { QuestionService } from '../../_services/question.service';
import { QuestionEditService } from '../../_services/question-edit.service';

import { environment } from '../../_environments/environment'

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.page.html',
  styleUrls: ['./question-display.page.scss'],
})
export class QuestionDisplayPage implements OnInit {

	questionId:number = -1;
	question:any = undefined;
	lilvassociations:any = undefined;

	funcKey = "qdpg-controller";

	LINE_ITEM_ID_IDX = 0;
	LEVEL_IDX = 1;

	constructor(private _location: Location,
			    private _router: Router,
			    private _route: ActivatedRoute,
			    private _questionService: QuestionService,
				  private _questionEditService: QuestionEditService,
			    private _functionPromiseService: FunctionPromiseService
			    ) {

	}

	ngOnInit() {
		let self = this;
		self._route.params.subscribe((params) => {
			self.questionId = params['questionId'];

			if (self.questionId) {
				self._questionService.getQuestionById(self.questionId).then((q) => {
					self.question = q;
				});

				self._questionService.getLineItemLevelAssociations(self.questionId).then((data) => {
					self.lilvassociations = data;

					console.log("---", self.lilvassociations);
				})

				self._functionPromiseService.reset(self.funcKey);
				self._functionPromiseService.initFunc(self.funcKey, () => {
					return new Promise((resolve, reject) => {
						resolve({
							getEnv: () => {
								return environment;
							},
							getColorMeaningString: () => {
								return "lightblue means this question is associated with that cell. Someone of that skill level should be able to answer this question. To change the skills that this question applies to, click Edit to edit the question."
							},
							getBackgroundColor: (lineItem, idx):string => {
								let rtn: string = '';
								if (self.getAssociatedLevel(lineItem['id']) === idx) {
									rtn = "lightblue";
								} else {
									rtn = "white";
								}

								return rtn;
							},
						})
					})
				})
			}
		});
	}

	getSkillsMatrixComponentController() {
		return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
	}

	getQuestionText() {
		return this.question && this.question["text"];
	}

	getQuestionDescription() {
		return this.question && this.question["description"];
	}

	onEditQuestionBtnClicked() {
    const self = this;

		this._questionEditService.reset();
		this._questionEditService.setSetupFunc(
			// this returns an array of lineItemLevels, one for each that this question has selected
			() => {
				return self.lilvassociations.map(e => { return {lineItemId: e[this.LINE_ITEM_ID_IDX], levelNumber: e[this.LEVEL_IDX]} });
			}
		);

		this._router.navigate(['/question-manager/question-edit/' + this.questionId]);
	}

	onBackBtnClicked() {
		this._location.back();
	}

	getAssociatedLevel(lineItemId) {
		let assoc = (this.lilvassociations && this.lilvassociations.find((elem) => { return elem[this.LINE_ITEM_ID_IDX] === lineItemId; }));
		return assoc ? assoc[this.LEVEL_IDX] : -1;
	}
}
