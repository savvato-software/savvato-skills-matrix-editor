import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPage } from './editor.page';

const routes: Routes = [
  {
    path: '',
    component: EditorPage
  },
  {
    path: 'skills-matrix-topic-edit/:topicId',
    loadChildren: () => import('./skills-matrix-topic-edit/skills-matrix-topic-edit.module').then(m => m.SkillsMatrixTopicEditPageModule)
  },
  {
    path: 'skills-matrix-line-item-edit/:lineItemId',
    loadChildren: () => import('./skills-matrix-line-item-edit/skills-matrix-line-item-edit.module').then(m => m.SkillsMatrixLineItemEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
