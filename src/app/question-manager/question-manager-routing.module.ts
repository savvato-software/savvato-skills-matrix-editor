import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionManagerPage } from './question-manager.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionManagerPage
  },
  {
    path: 'question-display',
    loadChildren: () => import('./question-display/question-display.module').then( m => m.QuestionDisplayPageModule)
  },
  {
    path: 'question-edit',
    loadChildren: () => import('./question-edit/question-edit.module').then( m => m.QuestionEditPageModule)
  },
  {
    path: 'question-list',
    loadChildren: () => import('./question-list/question-list.module').then( m => m.QuestionListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionManagerPageRoutingModule {}
