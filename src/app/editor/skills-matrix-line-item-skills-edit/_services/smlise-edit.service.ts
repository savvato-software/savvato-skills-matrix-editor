import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SmliseEditService {

  public topics: any;
  public getLineItemFunc: (topicId) => Array<object>
  public selectedSkillsParentLineItemId: string | undefined

  constructor() {
    this.topics = [];
    this.getLineItemFunc = (topicId) => [];
    this.selectedSkillsParentLineItemId = undefined;
  }
}
