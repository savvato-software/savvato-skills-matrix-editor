import { Injectable } from '@angular/core';
// import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { SkillsMatrixApiService } from "./skills-matrix.api.service";

@Injectable({
    providedIn: 'root'
})
export class SkillsMatrixModelService {

    model: any = {};

    constructor(private _skillsMatrixApiService: SkillsMatrixApiService) {

    }

    getAllSkillsMatrices() {
        return new Promise((resolve, reject) => {
            this._skillsMatrixApiService.getAllSkillsMatrices().then((response) => {
                this.model = response;
                resolve(response);
            })
        })
    }

    getModel() {
        return this.model;
    }

    getSkillsMatrixById(id) {
        return new Promise((resolve, reject) => {
            this._skillsMatrixApiService.getSkillsMatrixById(id).then((response) => {
                resolve(response);
            })
        })
    }
}
