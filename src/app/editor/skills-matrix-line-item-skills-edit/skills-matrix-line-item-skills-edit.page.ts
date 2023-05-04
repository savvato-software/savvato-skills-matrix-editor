import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import { environment } from '../../../_environments/environment'
import {SequenceService} from "@savvato-software/savvato-javascript-services";
import {AlertController} from "@ionic/angular";
import {SmliseEditService} from "./_services/smlise-edit.service";

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
              private _sequenceService: SequenceService,
              private _alertController: AlertController,
              private _smliseEditService: SmliseEditService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._initWithSameSkillsMatrixID();

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

  mruLevel = undefined;
  async onAddSkillClicked() {
      const self = this;
      const alert = await this._alertController.create({
        header: 'Choose a Level, enter a Description',
        inputs: [
          {
            name: 'string',
            type: 'text',
            placeholder: 'Enter String'
          },
          {
            name: 'level',
            type: 'number',
            placeholder: 'Enter Level',
            value: self.mruLevel
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Submit',
            handler: async (data) => {
              if (!data || !data.level || !data.string)
                return false;

              if (data.level < 1)
                data.level = 1;
              else if (data.level > 4)
                data.level = 4;

              await this._skillsMatrixModelService.addSkill(this.lineItemId, data.level, data.string);

              self.mruLevel = data.level;
              await this.onAddSkillClicked();

              return true;
            },
          }
        ]
      });

      await alert.present();
  }

  onDeleteSkillClicked() {
    this._skillsMatrixModelService.deleteSkill(this.lineItemId, this.selectedSkillId).then(() => {
      this.selectedSkillId = -1;
      this.selectedSkillLevelId = -1;
    })
  }

  async onEditSkillClicked() {
    // get list of topics and line items
    // set in service
   this._smliseEditService.passedValue = "YErp!"
    await this._router.navigate(['/editor/skills-matrix-line-item-skills-edit/smlise-edit-skill/' + this.lineItemId + '/' + this.selectedSkillId]);
  }

  isSelectedSkillAbleToMoveUp() {
    if (this.isSkillSelected()) {
      const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

      if (skills.length > 0) {
        let skill = skills.find((s: any) => s['id'] === this.selectedSkillId);
        if (skill)
          return this._sequenceService.isAbleToMove(skills, skill, this._sequenceService.BACKWARD);
      }
    }

    return undefined;
  }

  isSelectedSkillAbleToMoveDown() {
    if (this.isSkillSelected()) {
      const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.selectedSkillLevelId);

      if (skills.length > 0) {
        let skill = skills.find((s: any) => s['id'] === this.selectedSkillId);
        if (skill)
          return this._sequenceService.isAbleToMove(skills, skill, this._sequenceService.FORWARD)
      }
    }

    return undefined;
  }

  isSelectedSkillAbleToMove() {
    return this.isSkillSelected();
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

  async onMoveSkillClicked() {
      const skillsMatrixModelId = this._skillsMatrixModelService.getModel()['id'];
      const alert = await this._alertController.create({
        header: 'Select Level',
        inputs: [
          { type: 'radio', label: 'Level 1', value: 1, checked: this.selectedSkillLevelId === 1, disabled: this.selectedSkillLevelId === 1 },
          { type: 'radio', label: 'Level 2', value: 2, checked: this.selectedSkillLevelId === 2, disabled: this.selectedSkillLevelId === 2 },
          { type: 'radio', label: 'Level 3', value: 3, checked: this.selectedSkillLevelId === 3, disabled: this.selectedSkillLevelId === 3 },
          { type: 'radio', label: 'Level 4', value: 4, checked: this.selectedSkillLevelId === 4, disabled: this.selectedSkillLevelId === 4 },
        ],
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          { text: 'OK', handler: (data) => { this._skillsMatrixModelService.moveSkillToAnotherLevel(skillsMatrixModelId, this.lineItemId, this.selectedSkillId, data)
                .then(() => {
                  this._skillsMatrixModelService._initWithSameSkillsMatrixID(false);
                })} }
        ]
      });
      await alert.present();
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
    this._skillsMatrixModelService.saveSkillSequenceInfo().then(() => {
      this._router.navigate(['/editor/' + this._skillsMatrixModelService.getModel()['id']]);
    });
  }
}
