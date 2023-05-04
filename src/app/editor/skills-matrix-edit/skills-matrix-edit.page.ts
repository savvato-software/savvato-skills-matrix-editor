import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import {environment} from "../../../_environments/environment";

@Component({
  selector: 'app-skills-matrix-edit',
  templateUrl: './skills-matrix-edit.page.html',
  styleUrls: ['./skills-matrix-edit.page.scss'],
})
export class SkillsMatrixEditPage implements OnInit {

  dirty = false;
  matrix = {id: -1, name: ''};

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _skillsMatrixModelService: SkillsMatrixModelService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._initWithSameSkillsMatrixID();

    self._route.params.subscribe((params) => {
      let skillsMatrixId = params['skillsMatrixId'] * 1;

      if (skillsMatrixId) {
        self._skillsMatrixModelService.waitingPromise().then(() => {
          self.matrix = self._skillsMatrixModelService.getModel();
        })
      }
    })
  }

  onBackBtnClicked() {
    let self = this;
    if (self.isDirty()) {
      self._skillsMatrixModelService.updateSkillsMatrixName(self.matrix['name']).then((data) => {
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
