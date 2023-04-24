import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillsMatrixTopicEditPageRoutingModule } from './skills-matrix-topic-edit-routing.module';

import { SkillsMatrixTopicEditPage } from './skills-matrix-topic-edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillsMatrixTopicEditPageRoutingModule
  ],
  declarations: [SkillsMatrixTopicEditPage]
})
export class SkillsMatrixTopicEditPageModule {}
