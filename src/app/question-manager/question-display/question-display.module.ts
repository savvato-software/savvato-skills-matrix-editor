import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionDisplayPageRoutingModule } from './question-display-routing.module';

import { QuestionDisplayPage } from './question-display.page';

import { DtimTechprofileModule } from 'dtim-techprofile';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionDisplayPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [QuestionDisplayPage]
})
export class QuestionDisplayPageModule {}
