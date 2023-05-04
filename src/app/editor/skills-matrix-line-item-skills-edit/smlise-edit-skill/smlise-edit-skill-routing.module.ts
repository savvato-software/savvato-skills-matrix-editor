import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmliseEditSkillPage } from './smlise-edit-skill.page';

const routes: Routes = [
  {
    path: '',
    component: SmliseEditSkillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmliseEditSkillPageRoutingModule {}
