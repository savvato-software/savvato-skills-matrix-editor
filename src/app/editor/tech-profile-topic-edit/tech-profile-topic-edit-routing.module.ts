import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechProfileTopicEditPage } from './tech-profile-topic-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TechProfileTopicEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechProfileTopicEditPageRoutingModule {}
