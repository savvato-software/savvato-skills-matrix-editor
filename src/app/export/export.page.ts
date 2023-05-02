import { Component, OnInit } from '@angular/core';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import {environment} from "../../_environments/environment";

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {

  constructor(private _skillsMatrixModelService: SkillsMatrixModelService) { }

  ngOnInit() {
    this._skillsMatrixModelService.setEnvironment(environment);
    this._skillsMatrixModelService._initWithSameSkillsMatrixID()
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
