import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {SkillsMatrixModelService} from "@savvato-software/savvato-skills-matrix-services";
import {environment} from "../../../../_environments/environment";

import { Skill } from '@savvato-software/savvato-skills-matrix-services'

import { SmliseEditService } from "../_services/smlise-edit.service";

@Component({
  selector: 'app-smlise-edit-skill',
  templateUrl: './smlise-edit-skill.page.html',
  styleUrls: ['./smlise-edit-skill.page.scss'],
})
export class SmliseEditSkillPage implements OnInit {

  dirty = false;
  skill: Skill = {id: '', description: '', detailLineItemId: ''}

  selectedTopicId: string = '';

  lineItem: any = undefined;

  detailLineItem: any = undefined;
  parentTopicOfDetailLineItem: any = undefined;

  selectedParentTopic: any = undefined;

  showDetailLineItemControls: boolean = false;

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
      let lineItemId: string = params['lineItemId'];
      let skillId: string = params['skillId'];

      if (lineItemId && skillId) {
        self._skillsMatrixModelService.waitingPromise().then(() => {
              //////////
              self.skill = self._skillsMatrixModelService.getSkillByLineItemId(lineItemId, skillId);

              self.lineItem = self._skillsMatrixModelService.getSkillsMatrixLineItemById(lineItemId);

              if (self.skill['detailLineItemId']) {
                self.detailLineItem = self._skillsMatrixModelService.getSkillsMatrixLineItemById(self.skill['detailLineItemId']);
                self.parentTopicOfDetailLineItem = self._skillsMatrixModelService.getParentTopicOfLineItem(self.detailLineItem['id']);

                self.selectedParentTopic = self.parentTopicOfDetailLineItem;
                self.selectedLineItem = self.detailLineItem;
              }
            })
      }
    })
  }

  _hasBtnBeenPressed: boolean = false;
  hasBtnBeenPressed() {
    return this._hasBtnBeenPressed;
  }

  onDetailLineItemBtn() {
    this._hasBtnBeenPressed = true;
    this.showDetailLineItemControls = true;
  }

  showDetailLineItemEditControls() {
    return this.showDetailLineItemControls;
  }

  showExistingDetailLineItemInfo() {
    return this.selectedParentTopic && this.selectedLineItem;
  }

  getDetailLineItemName() {
    const self = this;
    return self.selectedLineItem && self.selectedLineItem['name'];
  }

  getDetailLineItemParentTopicName() {
    const self = this;
    return self.selectedParentTopic && self.selectedParentTopic['name'];
  }

  getTopics() {
    return this._smliseEditService.topics;
  }

  getLineItems() {
    // TODO call getLineItemFunc(passing smliseEditService.topics and the topic number we recalled when that was selected
    // return new Promise((resolve, reject) => resolve([{id: 1, desc: 'one'}, {id: 2, desc: 'two'}]));
   return this._smliseEditService.getLineItemFunc(this.selectedTopicId);
  }

  onSelectTopic(evt) {
    this.selectedTopicId = evt.detail.value['topic']['id'];
    console.log("selectedTopicId == " + this.selectedTopicId)
  }

  selectedLineItem: any = undefined;
  onLineItemSelected(lineItem) {
    console.log(lineItem);

    if (this.selectedLineItem && this.selectedLineItem['id'] === lineItem['id']) {
      this.selectedLineItem = null;
      this.skill["detailLineItemId"] = '';
    }
    else {
      this.selectedLineItem = lineItem;
      this.skill["detailLineItemId"] = lineItem['id'];
    }
  }

  onBackBtnClicked() {
    let self = this;
    if (self.isDirty()) {
      self._skillsMatrixModelService.updateSkill(self.skill).then((data) => {
        self._location.back();
      })
    } else {
      self._location.back();
    }
  }

  isLineItemSelected(lineItem: any) {
    return this.selectedLineItem && lineItem['id'] === this.selectedLineItem['id'];
  }

  // TODO: do we want the controller doing this, even though this page is not the component per se, but for a
  //  sense of consistency? configurable consistency?
  getBackgroundColor(lineItem: any, selected: boolean) {
    return selected ? "red" : undefined;
  }

  isDirty() {
    return this.dirty;
  }

  setDirty() {
    this.dirty = true;
  }
}
