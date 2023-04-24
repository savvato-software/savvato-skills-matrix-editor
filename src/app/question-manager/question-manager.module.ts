import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionManagerPageRoutingModule } from './question-manager-routing.module';

import { QuestionManagerPage } from './question-manager.page';

import { SavvatoSkillsMatrixComponentModule } from "@savvato-software/savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionManagerPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [QuestionManagerPage]
})
export class QuestionManagerPageModule {}
