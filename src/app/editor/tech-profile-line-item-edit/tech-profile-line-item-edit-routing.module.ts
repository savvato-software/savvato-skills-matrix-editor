import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechProfileLineItemEditPage } from './tech-profile-line-item-edit.page';

const routes: Routes = [
  {
    path: '',
    component: TechProfileLineItemEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechProfileLineItemEditPageRoutingModule {}
