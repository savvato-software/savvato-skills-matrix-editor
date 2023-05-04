import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsMatrixEditPage } from './skills-matrix-edit.page';

const routes: Routes = [
  {
    path: '',
    component: SkillsMatrixEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsMatrixEditPageRoutingModule {}
