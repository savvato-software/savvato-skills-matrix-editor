import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionManagerPage } from './question-manager.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionManagerPage
  },
  {
    path: 'question-display/:questionId',
    loadChildren: () => import('./question-display/question-display.module').then( m => m.QuestionDisplayPageModule)
  },
  {
    path: 'question-edit/new',
    loadChildren: () => import('./question-edit/question-edit.module').then( m => m.QuestionEditPageModule)
  },
  {
    path: 'question-edit/:questionId',
    loadChildren: () => import('./question-edit/question-edit.module').then( m => m.QuestionEditPageModule)
  },
  {
    path: 'question-list/:lineItemId/:level',
    loadChildren: () => import('./question-list/question-list.module').then( m => m.QuestionListPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionManagerPageRoutingModule {}
