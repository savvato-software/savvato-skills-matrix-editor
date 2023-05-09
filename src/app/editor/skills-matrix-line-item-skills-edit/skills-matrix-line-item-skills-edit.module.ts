import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillsMatrixLineItemSkillsEditPageRoutingModule } from './skills-matrix-line-item-skills-edit-routing.module';

import { SkillsMatrixLineItemSkillsEditPage } from './skills-matrix-line-item-skills-edit.page';
import {SavvatoSkillsMatrixLineItemSkillsComponentModule} from "savvato-skills-matrix-line-item-skills-component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SkillsMatrixLineItemSkillsEditPageRoutingModule,
        SavvatoSkillsMatrixLineItemSkillsComponentModule
    ],
  declarations: [SkillsMatrixLineItemSkillsEditPage]
})
export class SkillsMatrixLineItemSkillsEditPageModule {}
