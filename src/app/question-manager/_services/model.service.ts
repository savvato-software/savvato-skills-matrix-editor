import { Injectable } from '@angular/core';

import { ApiService } from '../../_services/api.service'
import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'
import { environment } from '../../../_environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ModelService {

	GET_ALL_QUESTION_COUNTS_PER_CELL = "getQuestionCountsForAllCells";
	GET_QUESTION_COUNT_OF_A_GIVEN_CELL = "getQuestionCountForAGivenCell";
	GET_MAX_QUESTION_COUNT_FOR_ANY_CELL = "highestQuestionCountForAnyCell";

	constructor(private _apiService: ApiService,
				private _functionPromiseService: FunctionPromiseService) {

	}

	_init() {
		let self;

		this._functionPromiseService.reset(this.GET_ALL_QUESTION_COUNTS_PER_CELL);
		this._functionPromiseService.initFunc(this.GET_ALL_QUESTION_COUNTS_PER_CELL, () => {
			return new Promise((resolve, reject) => {
				let url = environment.apiUrl + "/api/techprofile/questionCountsPerCell";
				this._apiService.get(url)
				.subscribe((qcpc) => {
					resolve(qcpc);
				}, (err) => {
					reject(err);
				})
			})
		});

		this._functionPromiseService.initFunc(this.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let qcpc = data['questionCountsPerCell'];

				if (!qcpc) 
					throw new Error("questionCountsPerCell needed.");
				else {
					let rtn = 0;
					let found = false;
					let passed = false;
					let i = 0;

					while (i < qcpc.length && !passed && !found) {
						let curr = qcpc[i];

						passed = (curr[0] > data['lineItemId']); // have we passed the point we are looking for?

						if (!passed) {
							if (data['lineItemId'] == curr[0] && data['lineItemLevelIndex'] == curr[1]) {
								rtn = curr[2];
								found = true;
							}
						}

						i++;
					}

					resolve(rtn);
				}
			})
		})

		this._functionPromiseService.initFunc(this.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL, (data) => {
			return new Promise((resolve, reject) => {
				let qcpc = data['questionCountsPerCell'];

				let max = undefined;
				let i = 0;

				while (qcpc && i < qcpc.length) {
					let curr = qcpc[i];
					if (max === undefined || curr[2] > max) max = curr[2]; 
					i++;
				}

				resolve(max);
			})
		})
	}

	getQuestionCountForCell(id, idx) {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_ALL_QUESTION_COUNTS_PER_CELL, self.GET_ALL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'lineItemId': id, 'lineItemLevelIndex': idx, 'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL+""+id+"-"+idx+"/"+qcpc.length, self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, data)
		}
		
		return rtn;
	}

	getHighestQuestionCountForAnyCell() {
		let self = this;
		let rtn = undefined;

		let qcpc = this._functionPromiseService.get(self.GET_ALL_QUESTION_COUNTS_PER_CELL, self.GET_ALL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'questionCountsPerCell': qcpc};
			rtn = this._functionPromiseService.get(self.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL,self.GET_MAX_QUESTION_COUNT_FOR_ANY_CELL, data);
		}

		return rtn;
	}

	getPercentileForTheNumberOfQuestionsForThisCell(id, idx) {
		// get a count for each of the cells
		let self = this;
		let qcpc = this._functionPromiseService.get(self.GET_ALL_QUESTION_COUNTS_PER_CELL, self.GET_ALL_QUESTION_COUNTS_PER_CELL, { });

		if (qcpc) {
			let data = {'questionCountsPerCell': qcpc};
			let gcqc = this._functionPromiseService.get(self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL+""+id+"-"+idx+"/"+qcpc.length, self.GET_QUESTION_COUNT_OF_A_GIVEN_CELL, data)
			

			if (qcpc) {
				let arr = qcpc.map((elem) => { return elem[2]; }) // arr of the question counts for each cell in the profile

				// sort array ascending
				const asc = arr => arr.sort((a, b) => a - b);

				const sum = arr => arr.reduce((a, b) => a + b, 0);

				const mean = arr => sum(arr) / arr.length;

				// sample standard deviation
				const std = (arr) => {
				    const mu = mean(arr);
				    const diffArr = arr.map(a => (a - mu) ** 2);
				    return Math.sqrt(sum(diffArr) / (arr.length - 1));
				};

				const calculateNtile = (arr, q) => {
				    const sorted = asc(arr);
				    const pos = ((sorted.length) - 1) * q;
				    const base = Math.floor(pos);
				    const rest = pos - base;
				    if ((sorted[base + 1] !== undefined)) {
				        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
				    } else {
				        return sorted[base];
				    }
				};

				let maxIdx = 0;
				[0,1,2,3,4,5,6,7,8,9].forEach(i => {
					let nTile = calculateNtile(arr, ((i + 1) / 10));
					if (nTile <= gcqc) maxIdx++;
				})

				return maxIdx;
			}
		}

		return undefined;
	}
}
