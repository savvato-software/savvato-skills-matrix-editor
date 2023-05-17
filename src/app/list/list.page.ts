import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    model:any  = null;

	constructor(private _location: Location,
				private _router: Router,
				private _route: ActivatedRoute,
                private _alertService: AlertService,
                private _skillsMatrixApiService: SkillsMatrixAPIService,
				private _functionPromiseService: FunctionPromiseService) {

	}

  ngOnInit() {
    this._skillsMatrixApiService.setEnvironment(environment);
    this._skillsMatrixApiService.getAllSkillsMatrices().then((sms) => {
        this.model = sms;
     })
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  getSkillsMatrices() {
      return this.model;
  }

  onSkillsMatrixClick(skillsMatrix: any) {
      this._router.navigate(['/display/' + skillsMatrix['skillsMatrixId']]);
  }

  async onCreateBtnClick() {
        const self = this;

        self._alertService.show({
          header: 'Enter text',
          inputs: [
              {
                  name: 'string',
                  type: 'text',
                  placeholder: 'Enter a name for this matrix',
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
              },
              {
                  text: 'Submit',
                  handler: data => {
                      if (data && data.string) {
                          this._skillsMatrixApiService.addSkillsMatrix(data.string).then(() => {
                              this._skillsMatrixApiService.getAllSkillsMatrices().then((sms) => {
                                  this.model = sms;
                              })
                          })
                          return true;
                      } else {
                        return false;
                      }
                  }
              }
          ]
      });
  }
}
