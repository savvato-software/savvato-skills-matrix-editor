import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkillsMatrixEditPageRoutingModule } from './skills-matrix-edit-routing.module';

import { SkillsMatrixEditPage } from './skills-matrix-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkillsMatrixEditPageRoutingModule
  ],
  declarations: [SkillsMatrixEditPage]
})
export class SkillsMatrixEditPageModule {}
