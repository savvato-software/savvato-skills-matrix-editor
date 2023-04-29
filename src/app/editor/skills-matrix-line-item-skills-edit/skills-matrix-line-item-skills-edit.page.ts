import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import { environment } from '../../../_environments/environment'
import {SequenceService} from "@savvato-software/savvato-javascript-services";

@Component({
  selector: 'app-skills-matrix-line-item-skills-edit',
  templateUrl: './skills-matrix-line-item-skills-edit.page.html',
  styleUrls: ['./skills-matrix-line-item-skills-edit.page.scss'],
})
export class SkillsMatrixLineItemSkillsEditPage implements OnInit {

  lineItemId: number = -1;
  selectedSkillId: number = -1;
  selectedSkillLevelId: number = -1;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _skillsMatrixModelService: SkillsMatrixModelService,
              private _sequenceService: SequenceService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._init();

    self._route.params.subscribe((params) => {
      self.lineItemId = params['lineItemId'] * 1;
    })
  }

  getSkills(level: number) {
    return this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, level)
        .sort((a: any, b: any) => { return a['sequence'] > b['sequence']; });
  }

  getLineItemName() {
    let li = this._skillsMatrixModelService.getLineItemById(this.lineItemId);

    if (li)
      return li['name'];
    else
      return '';
  }

  isSkillSelected() {
    return this.selectedSkillId > 0;
  }

  onAddSkillClicked() {

  }

  onDeleteSkillClicked() {

  }

  isSelectedSkillAbleToMoveUp() {
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

    if (skills.length > 0)
     return this._sequenceService.isAbleToMove(skills, skills.find((s: any) => s['id'] === this.selectedSkillId), this._sequenceService.BACKWARD);

    return undefined;
  }

  isSelectedSkillAbleToMoveDown() {
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

    if (skills.length > 0)
      return this._sequenceService.isAbleToMove(skills, skills.find((s: any) => s['id'] === this.selectedSkillId), this._sequenceService.FORWARD);

    return undefined;
  }

  isSelectedSkillAbleToMove() {
    return false;
  }

  onMoveSkillUpClicked() {
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

    const skill = skills.find((s: any) => s['id'] === this.selectedSkillId);

    this._sequenceService.moveSequenceByOne(skills, skill, this._sequenceService.BACKWARD);
  }

  onMoveSkillDownClicked() {
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

    const skill = skills.find((s: any) => s['id'] === this.selectedSkillId);

    this._sequenceService.moveSequenceByOne(skills, skill, this._sequenceService.FORWARD);
  }

  onMoveSkillClicked() {

  }

  onSkillClicked(skill:any, level: number) {
    if (this.selectedSkillId === skill['id']) {
      this.selectedSkillId = -1;
      this.selectedSkillLevelId = -1;
    }
    else {
      this.selectedSkillId = skill['id'];
      this.selectedSkillLevelId = level;
    }
  }

  getBackgroundColor(skill: any, level: number) {
    if (skill['id'] === this.selectedSkillId)
      return "red";

    return "white";
  }

  onFinishedEditingBtnClicked() {
    this._router.navigate(['/editor']);
  }
}
