import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkillsMatrixTopicEditPage } from './skills-matrix-topic-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: SkillsMatrixTopicEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkillsMatrixTopicEditPageRoutingModule {}
