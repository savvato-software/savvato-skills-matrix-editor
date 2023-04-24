import { Injectable } from '@angular/core';
import {AuthService, JWTApiService} from '@savvato-software/savvato-javascript-services';

import { environment } from '../../../_environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SkillsMatrixApiService {

    constructor(private _apiService: JWTApiService,
                private _authService: AuthService) {

    }

    getAllSkillsMatrices() {
        const url = environment.skillsMatrixApiUrl + '/api/v1/skills-matrix/';

        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                }
            )
        });
    }

    getSkillsMatrixById(id) {
        const url = environment.skillsMatrixApiUrl + '/api/v1/skills-matrix/' + id;

        return new Promise((resolve, reject) => {
            this._apiService.get(url).subscribe(
                (_data) => {
                    resolve(_data);
                }
            )
        })
    }

}
