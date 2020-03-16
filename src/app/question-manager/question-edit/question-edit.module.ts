import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionEditPageRoutingModule } from './question-edit-routing.module';

import { QuestionEditPage } from './question-edit.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionEditPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [QuestionEditPage]
})
export class QuestionEditPageModule {}
