import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechProfileLineItemEditPageRoutingModule } from './skills-matrix-line-item-edit-routing.module';

import { SkillsMatrixLineItemEditPage } from './skills-matrix-line-item-edit-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechProfileLineItemEditPageRoutingModule
  ],
  declarations: [SkillsMatrixLineItemEditPage]
})
export class SkillsMatrixLineItemEditPageModule {}
