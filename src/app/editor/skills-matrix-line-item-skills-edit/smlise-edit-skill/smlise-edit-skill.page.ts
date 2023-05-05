import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {environment} from "../../../../_environments/environment";

import { SmliseEditService } from "../_services/smlise-edit.service";

@Component({
  selector: 'app-smlise-edit-skill',
  templateUrl: './smlise-edit-skill.page.html',
  styleUrls: ['./smlise-edit-skill.page.scss'],
})
export class SmliseEditSkillPage implements OnInit {

  dirty = false;
  skill = {description: '', detailLineItemId: -1}

  constructor(private _location: Location,
              private _router: Router,
              private _route: ActivatedRoute,
              private _skillsMatrixModelService: SkillsMatrixModelService,
              private _smliseEditService: SmliseEditService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._initWithSameSkillsMatrixID();

    self._route.params.subscribe((params) => {
      let lineItemId = params['lineItemId'] * 1;
      let skillId = params['skillId'] * 1;

      if (lineItemId && skillId) {
        self._skillsMatrixModelService.waitingPromise().then(() => {
          self.skill = self._skillsMatrixModelService.getSkillByLineItemId(lineItemId, skillId);
        })
      }
    })
  }

  getValue() {
    return this._smliseEditService.passedValue;
  }

  onBackBtnClicked() {
    let self = this;
    if (self.isDirty()) {
      // self._skillsMatrixModelService.updateSkill(self.skill['name']).then((data) => {
        self._location.back();
      // })
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
