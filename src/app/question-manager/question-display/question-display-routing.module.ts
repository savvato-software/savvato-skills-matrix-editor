import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDisplayPage } from './question-display.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionDisplayPageRoutingModule {}
