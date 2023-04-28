import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsMatrixLineItemSkillsEditPage } from './skills-matrix-line-item-skills-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SkillsMatrixLineItemSkillsEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsMatrixLineItemSkillsEditPageRoutingModule {}
