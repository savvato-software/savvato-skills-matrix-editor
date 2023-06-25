import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";

import { environment } from '../../_environments/environment'
import {FunctionPromiseService, SequenceService} from "@savvato-software/savvato-javascript-services";
import {AlertController} from "@ionic/angular";
import {SmliseEditService} from "./_services/smlise-edit.service";

@Component({
  selector: 'app-skills-matrix-line-item-skills-edit',
  templateUrl: './skills-matrix-line-item-skills-edit.page.html',
  styleUrls: ['./skills-matrix-line-item-skills-edit.page.scss'],
})
export class SkillsMatrixLineItemSkillsEditPage implements OnInit {

  skillsMatrixId: string = '';
  lineItemId: string = '';

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

    self._route.params.subscribe((params) => {
      self.skillsMatrixId = params['skillsMatrixId'];
      self.lineItemId = params['lineItemId'];
    })

    self._functionPromiseService.reset(self.funcKey);

    self._functionPromiseService.initFunc(self.funcKey, () => {
      return new Promise((resolve, reject) => {
        resolve({
          initModelService: () => {
            return new Promise((resolve, reject) => {
              self._skillsMatrixModelService._init(self.skillsMatrixId, true);

              self._skillsMatrixModelService.waitUntilAvailable().then((data) => {
                resolve(true);
              });
            })
          },
          getLineItem: () => {
            return self._skillsMatrixModelService.getSkillsMatrixLineItemById(self.lineItemId);
          },
          getSkills: (level) => {
            const lineItem = self._skillsMatrixModelService.getSkillsMatrixLineItemById(self.lineItemId);
            return self._skillsMatrixModelService.getSkillsForALineItemAndLevel(lineItem, level);
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

              let strings = data.string.split('    ').map(s => s.trim()).filter(s => s.length > 0);
              let idx = 0;

              while (idx < strings.length) {
                await this._skillsMatrixModelService.addSkill(this.lineItemId, data.level, strings[idx++]);
              }

              this._skillsMatrixModelService.refresh();

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
    this._skillsMatrixModelService.deleteSkill(this.lineItemId, this.getSelectedSkillId()).then(() => {
      this._skillsMatrixModelService.refresh();
    })
  }

  getParentLineItemId(): string|undefined {
    const skillsMatrixes = this._skillsMatrixModelService.getSkillsMatrixes();
    const skillId = this.getSelectedSkillId();

    for (const skillsMatrix of skillsMatrixes) {
      for (const topic of skillsMatrix.topics) {
        for (const lineItem of topic.lineItems) {
          const skill = lineItem.skills.find(s => s.id === skillId);
          if (skill) {
            return lineItem.id;
          }
        }
      }
    }

    return undefined;
  }

  async onEditSkillClicked() {
    const self = this;

    const selectedSkillsParentLineItemId = this.getParentLineItemId();

    // get list of topics and line items
    // set in service
    const sm = self._skillsMatrixModelService.getSkillsMatrixContainingLineItemId(self.lineItemId);

    if (sm) {
      self._smliseEditService.topics = self._skillsMatrixModelService.getTopics(sm['id']);
      self._smliseEditService.selectedSkillsParentLineItemId = selectedSkillsParentLineItemId;
      self._smliseEditService.getLineItemFunc = (topicId) => {
        let topic = self._smliseEditService.topics.filter((t: any) => {
          return t['id'] === topicId;
        })[0];

        // get a list of all line items that are not the line item of my skill
        let lineItems = [];

        if (topic && topic["lineItems"])
          lineItems = topic["lineItems"].filter((li: any) => {
            return li['id'] != selectedSkillsParentLineItemId;
          });

        // filter that for any line items which have skills which dlis which refer to our line item, selectedSkillsParentLineItemId
        lineItems = lineItems.filter((li: any) => {
          return li["skills"].find(sk => sk["detailLineItemId"] == selectedSkillsParentLineItemId) === undefined;
        })

        // should return the line items available in this topic, minus the line item which this skill is connected to, and any line items with skills that refer to this line item (the parent of the selected skill)
        console.log("lineItems ", lineItems)
        return lineItems;
      }

      await this._router.navigate(['/editor/skills-matrix-line-item-skills-edit/smlise-edit-skill/' + this.lineItemId + '/' + this.getSelectedSkillId()]);
    } else {
      throw new Error("Could not find skills matrix containing line item id " + this.lineItemId);
    }
  }

  isSelectedSkillAbleToMoveUp() {
    if (this.isSkillSelected()) {
      return this._skillsMatrixModelService.isSkillAbleToMoveUp(this.lineItemId, this.getSelectedSkillLevelId(), this.getSelectedSkillId());
    }
    return undefined;
  }

  isSelectedSkillAbleToMoveDown() {
    if (this.isSkillSelected()) {
      return this._skillsMatrixModelService.isSkillAbleToMoveDown(this.lineItemId, this.getSelectedSkillLevelId(), this.getSelectedSkillId());
    }
    return undefined;
  }

  isSelectedSkillAbleToMove() {
    return this.isSkillSelected();
  }

  onMoveSkillUpClicked() {
    this._skillsMatrixModelService.moveSequenceForSkillsMatrixSkill(this.lineItemId, this.getSelectedSkillLevelId(), this.getSelectedSkillId(), this._sequenceService.BACKWARD);
  }

  onMoveSkillDownClicked() {
    this._skillsMatrixModelService.moveSequenceForSkillsMatrixSkill(this.lineItemId, this.getSelectedSkillLevelId(), this.getSelectedSkillId(), this._sequenceService.FORWARD);
  }

  async onMoveSkillClicked() {
      const self = this;
      const sm = self._skillsMatrixModelService.getSkillsMatrixContainingSkillId(self.getSelectedSkillId());
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
            if (sm) {
              self._skillsMatrixModelService.moveSkillToAnotherLevel(sm['id'], self.lineItemId, self.getSelectedSkillId(), data).then(() => {
                self._skillsMatrixModelService.refresh();
              });
            } else {
              throw new Error('Skills Matrix not found for selected skill.');
            }
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
      this._router.navigate(['/editor/' + this._skillsMatrixModelService.getSkillsMatrixes()[0]['id']]);
    });
  }
}
