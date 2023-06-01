import { Component, OnInit } from '@angular/core';
import {SkillsMatrixAPIService, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import {environment} from "../../_environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-export',
  templateUrl: './export.page.html',
  styleUrls: ['./export.page.scss'],
})
export class ExportPage implements OnInit {

  listOfSkillsMatrix: {skillsMatrixId: '', name: ''}[] = [];

  constructor(private _skillsMatrixModelService: SkillsMatrixModelService,
              private _skillsMatrixAPIService: SkillsMatrixAPIService,
              private _route: ActivatedRoute,
              private _router: Router
              ) { }

  ngOnInit() {

    const self = this;
    self._route.params.subscribe((params) => {

      self._skillsMatrixAPIService.setEnvironment(environment);

      self._skillsMatrixAPIService.getAllSkillsMatrices().then((data: any) => {
        self.listOfSkillsMatrix = data;
      })
    })
  }

  getListOfSkillsMatrix() {
    return this.listOfSkillsMatrix
  }

  onExportBtnClick(skillsMatrixId: string) {
    const self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._init(skillsMatrixId, true);

    self._skillsMatrixModelService.waitingPromise().then(() => {
        let model = self._skillsMatrixModelService.getSkillsMatrixById(skillsMatrixId);

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

  onListPageBtnClicked() {
    this._router.navigate(['/list/'])
  }
}
