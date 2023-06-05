import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import {SkillsMatrix, SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import {environment} from "../../_environments/environment";

@Component({
  selector: 'app-skills-matrix-edit',
  templateUrl: './skills-matrix-edit.page.html',
  styleUrls: ['./skills-matrix-edit.page.scss'],
})
export class SkillsMatrixEditPage implements OnInit {

  dirty = false;
  matrix: SkillsMatrix = {id: '', name: '', topics: [] };

  skillsMatrixId: string = '';

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _skillsMatrixModelService: SkillsMatrixModelService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);

    self._route.params.subscribe((params) => {
      let skillsMatrixId = params['skillsMatrixId'];

      if (skillsMatrixId) {
        self._skillsMatrixModelService._init(skillsMatrixId, true);

        self._skillsMatrixModelService.waitUntilAvailable().then(() => {
          self.matrix = self._skillsMatrixModelService.getSkillsMatrixById(skillsMatrixId);
          self.skillsMatrixId = skillsMatrixId;
        })
      }
    })
  }

  onBackBtnClicked() {
    let self = this;
    if (self.isDirty()) {
      self._skillsMatrixModelService.updateSkillsMatrixName(self.skillsMatrixId, self.matrix['name']).then((data) => {
        self._location.back();
      })
    } else {
      self._location.back();
    }
  }

  isDirty() {
    return this.dirty;
  }

  setDirty() {
    this.dirty = true;
  }
}
