import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionDisplayPageRoutingModule } from './question-display-routing.module';

import { QuestionDisplayPage } from './question-display.page';

import { SavvatoSkillsMatrixComponentModule} from "savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionDisplayPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [QuestionDisplayPage]
})
export class QuestionDisplayPageModule {}
