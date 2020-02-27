import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorPage } from './editor.page';

const routes: Routes = [
  {
    path: '',
    component: EditorPage
  },
  {
    path: 'tech-profile-topic-edit/:topicId',
    loadChildren: () => import('./tech-profile-topic-edit/tech-profile-topic-edit.module').then( m => m.TechProfileTopicEditPageModule)
  },
  {
    path: 'tech-profile-line-item-edit/:lineItemId',
    loadChildren: () => import('./tech-profile-line-item-edit/tech-profile-line-item-edit.module').then( m => m.TechProfileLineItemEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorPageRoutingModule {}
