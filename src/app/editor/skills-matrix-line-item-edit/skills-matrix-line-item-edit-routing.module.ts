import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsMatrixLineItemEditPage } from './skills-matrix-line-item-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: SkillsMatrixLineItemEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsMatrixLineItemEditPageRoutingModule {}
