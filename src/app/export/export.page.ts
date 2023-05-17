import { Component, OnInit } from '@angular/core';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import {environment} from "../../_environments/environment";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {

  skillsMatrixId: string = '';

  constructor(private _skillsMatrixModelService: SkillsMatrixModelService,
              private _route: ActivatedRoute
              ) { }

  ngOnInit() {

    const self = this;
    self._route.params.subscribe((params) => {
      self.skillsMatrixId = params['skillsMatrixId'];

      self._skillsMatrixModelService.setEnvironment(environment);
      self._skillsMatrixModelService._init(self.skillsMatrixId, true);
    })

  }

  getName() {
    return this._skillsMatrixModelService.isSkillsMatrixAvailable() && this._skillsMatrixModelService.getName();
  }

  onExportBtnClick() {
    const self = this;

    self._skillsMatrixModelService.waitingPromise().then(() => {
        let model = self._skillsMatrixModelService.getModel();

          // Convert the 'sm' object to JSON
          const jsonData = JSON.stringify(model);

          // Create a Blob object containing the JSON data
          const blob = new Blob([jsonData], {type: 'application/json'});

          // Create a URL for the Blob object
          const url = URL.createObjectURL(blob);

          // Open the URL in a new tab/window to trigger the download
          window.open(url);
      });
  }

}
