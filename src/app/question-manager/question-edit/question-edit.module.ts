import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionEditPageRoutingModule } from './question-edit-routing.module';

import { QuestionEditPage } from './question-edit.page';
import { SavvatoSkillsMatrixComponentModule } from "@savvato-software/savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionEditPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [QuestionEditPage]
})
export class QuestionEditPageModule {}
