import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { FunctionPromiseService } from '@savvato-software/savvato-javascript-services'

import { environment } from '../../_environments/environment'
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {AlertController} from "@ionic/angular";

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
                private _alertController: AlertController,
                private _skillsMatrixApiService: SkillsMatrixAPIService,
				private _functionPromiseService: FunctionPromiseService) {

	}

  ngOnInit() {
    this._skillsMatrixApiService.setEnvironment(environment);
    this._skillsMatrixApiService.getAllSkillsMatrices().then((sms) => {
        this.model = sms;
     })
  }

  getSkillsMatrices() {
        return this.model;
  }

  async onCreateBtnClick() {
      const alert = await this._alertController.create({
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
                      this._skillsMatrixApiService.addSkillsMatrix(data.string).then(() => {
                          this._skillsMatrixApiService.getAllSkillsMatrices().then((sms) => {
                              this.model = sms;
                          })

                      })
                  }
              }
          ]
      });

      await alert.present();

  }
}
