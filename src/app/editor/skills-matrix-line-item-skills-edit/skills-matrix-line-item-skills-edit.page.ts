import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import { environment } from '../../../_environments/environment'
import {FunctionPromiseService, SequenceService} from "@savvato-software/savvato-javascript-services";
import {AlertController} from "@ionic/angular";
import {SmliseEditService} from "./_services/smlise-edit.service";

@Component({
  selector: 'app-skills-matrix-line-item-skills-edit',
  templateUrl: './skills-matrix-line-item-skills-edit.page.html',
  styleUrls: ['./skills-matrix-line-item-skills-edit.page.scss'],
})
export class SkillsMatrixLineItemSkillsEditPage implements OnInit {

  lineItemId: string = '';
  selectedSkillId: string = '';
  selectedSkillLevelId: string = '';

  funcKey = "smlise1";

  selectedSkillProvider = () => { return null; }
  refreshComponentHandler = (liid) => { return null; }

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _skillsMatrixModelService: SkillsMatrixModelService,
              private _sequenceService: SequenceService,
              private _alertController: AlertController,
              private _functionPromiseService: FunctionPromiseService,
              private _smliseEditService: SmliseEditService) {

  }

  ngOnInit() {
    let self = this;

    self._skillsMatrixModelService.setEnvironment(environment);
    self._skillsMatrixModelService._initWithSameSkillsMatrixID();

    self._route.params.subscribe((params) => {
      self.lineItemId = params['lineItemId'];
    })

    self._functionPromiseService.reset(self.funcKey);

    self._functionPromiseService.initFunc(self.funcKey, () => {
      return new Promise((resolve, reject) => {
        resolve({
          getLineItemId: () => self.lineItemId,
          getSkillsMatrixModelService: () => {
            return self._skillsMatrixModelService;
          },
          getSkillBackgroundColor: (skill, isSelected) => {
            if (isSelected) {
              return "red";
            } else {
              return "white";
            }
          },
          setProviderForSelectedSkill: (func) => {
            self.selectedSkillProvider = func;
          },
          setHandlerToRefreshComponent: (func) => {
            self.refreshComponentHandler = func;
          }
        })
      })
    })
  }

  getLineItemSkillsComponentController() {
    return this._functionPromiseService.waitAndGet(this.funcKey, this.funcKey, { });
  }

  isSkillSelected() {
    return !!this.selectedSkillProvider();
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
      this.selectedSkillId = '';
      this.selectedSkillLevelId = '';
    })
  }

  getParentLineItemId() {
    const skillsMatrix = this._skillsMatrixModelService.getModel();
    const skillId = this.getSelectedSkillId();

    for (const topic of skillsMatrix.topics) {
      for (const lineItem of topic.lineItems) {
        const skill = lineItem.skills.find(s => s.id === skillId);
        if (skill) {
          return lineItem.id;
        }
      }
    }

    // WILO.. need to set the dropdown to the topic of the detail line item
    // and show the line item selected. may 11 13:57

    return null;
  }

  async onEditSkillClicked() {
    const self = this;

    const selectedSkillsParentLineItemId = this.getParentLineItemId();

    // get list of topics and line items
    // set in service
   self._smliseEditService.topics = self._skillsMatrixModelService.getTopics();
   self._smliseEditService.selectedSkillsParentLineItemId = selectedSkillsParentLineItemId[0];
   self._smliseEditService.getLineItemFunc = (topicId ) => {
     let topic = self._smliseEditService.topics.filter((t: any) => { return t['id'] === topicId; })[0];

     // get a list of all line items that are not the line item of my skill
     let lineItems = [];

     if (topic && topic["lineItems"])
       lineItems = topic["lineItems"].filter((li: any) => { return li['id'] != selectedSkillsParentLineItemId; });

     // filter that for any line items which have skills which dlis which refer to our line item, selectedSkillsParentLineItemId
     lineItems = lineItems.filter((li: any) => {
       return li["skills"].find(sk => sk["detailLineItemId"] == selectedSkillsParentLineItemId) === undefined;
     })

     // should return the line items available in this topic, minus the line item which this skill is connected to, and any line items with skills that refer to this line item (the parent of the selected skill)
     console.log("lineItems ", lineItems)
     return lineItems;
   }

    await this._router.navigate(['/editor/skills-matrix-line-item-skills-edit/smlise-edit-skill/' + this.lineItemId + '/' + this.getSelectedSkillId()]);
  }

  isSelectedSkillAbleToMoveUp() {
    const selectedSkillLevelId = this.getSelectedSkillLevelId()

    if (this.isSkillSelected()) {
      const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, selectedSkillLevelId);

      if (skills.length > 0) {
        const selectedSkillId = this.getSelectedSkillId();
        let skill = skills.find((s: any) => s['id'] === selectedSkillId);
        if (skill)
          return this._sequenceService.isAbleToMove(skills, skill, this._sequenceService.BACKWARD);
      }
    }

    return undefined;
  }

  isSelectedSkillAbleToMoveDown() {
    const selectedSkillLevelId = this.getSelectedSkillLevelId()

    if (this.isSkillSelected()) {
      const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, selectedSkillLevelId);

      if (skills.length > 0) {
        const selectedSkillId = this.getSelectedSkillId();
        let skill = skills.find((s: any) => s['id'] === selectedSkillId);
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
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.getSelectedSkillLevelId());

    const skill = skills.find((s: any) => s['id'] === this.getSelectedSkillId());

    this._sequenceService.moveSequenceByOne(skills, skill, this._sequenceService.BACKWARD);
  }

  onMoveSkillDownClicked() {
    const skills = this._skillsMatrixModelService.getSkillsForALineItemAndLevel(this.lineItemId, this.getSelectedSkillLevelId());

    const skill = skills.find((s: any) => s['id'] === this.getSelectedSkillId());

    this._sequenceService.moveSequenceByOne(skills, skill, this._sequenceService.FORWARD);
  }

  async onMoveSkillClicked() {
      const self = this;
      const skillsMatrixModelId = this._skillsMatrixModelService.getModel()['id'];
      const selectedSkillLevelId = this.getSelectedSkillLevelId();
      const alert = await this._alertController.create({
        header: 'Select Level',
        inputs: [
          { type: 'radio', label: 'Level 1', value: 1, checked: selectedSkillLevelId === 1, disabled: selectedSkillLevelId === 1 },
          { type: 'radio', label: 'Level 2', value: 2, checked: selectedSkillLevelId === 2, disabled: selectedSkillLevelId === 2 },
          { type: 'radio', label: 'Level 3', value: 3, checked: selectedSkillLevelId === 3, disabled: selectedSkillLevelId === 3 },
          { type: 'radio', label: 'Level 4', value: 4, checked: selectedSkillLevelId === 4, disabled: selectedSkillLevelId === 4 },
        ],
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          { text: 'OK', handler: (data) => {
              self._skillsMatrixModelService.moveSkillToAnotherLevel(skillsMatrixModelId, self.lineItemId, self.getSelectedSkillId(), data)
              .then(() => {
                self.refreshComponentHandler(self.lineItemId);
            })
          }}]
      })

      await alert.present();
  }

  getSelectedSkillLevelId() {
    const skill = this.selectedSkillProvider();
    return !!skill ? skill['level'] : -1;
  }

  getSelectedSkillId() {
    const skill = this.selectedSkillProvider();
    return !!skill ? skill['id'] : '';
  }

  onFinishedEditingBtnClicked() {
    this._skillsMatrixModelService.saveSkillSequenceInfo().then(() => {
      this._router.navigate(['/editor/' + this._skillsMatrixModelService.getModel()['id']]);
    });
  }
}
