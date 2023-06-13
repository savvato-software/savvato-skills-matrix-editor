import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'display/:skillsMatrixId',
    loadChildren: () => import('./display/display.module').then( m => m.DisplayPageModule)
  },
  {
    path: 'editor/:skillsMatrixId',
    loadChildren: () => import('./editor/editor.module').then( m => m.EditorPageModule)
  },
  {
    path: 'editor/skills-matrix-topic-edit/:topicId',
    loadChildren: () => import('./editor/skills-matrix-topic-edit/skills-matrix-topic-edit.module').then( m => m.SkillsMatrixTopicEditPageModule)
  },
  {
    path: 'editor/skills-matrix-line-item-edit/:lineItemId',
    loadChildren: () => import('./editor/skills-matrix-line-item-edit/skills-matrix-line-item-edit.module').then( m => m.SkillsMatrixLineItemEditPageModule)
  },
  {
    path: 'editor/skills-matrix-line-item-skills-edit/:skillsMatrixId/:lineItemId',
    loadChildren: () => import('./editor/skills-matrix-line-item-skills-edit/skills-matrix-line-item-skills-edit.module').then( m => m.SkillsMatrixLineItemSkillsEditPageModule)
  },
  {
    path: 'editor/skills-matrix-line-item-skills-edit/smlise-edit-skill/:lineItemId/:skillId',
    loadChildren: () => import('./editor/skills-matrix-line-item-skills-edit/smlise-edit-skill/smlise-edit-skill.module').then( m => m.SmliseEditSkillPageModule)
  },
  {
    path: 'editor/skills-matrix-edit/:skillsMatrixId',
    loadChildren: () => import('./editor/skills-matrix-edit/skills-matrix-edit.module').then( m => m.SkillsMatrixEditPageModule)
  },
  {
    path: 'question-manager',
    loadChildren: () => import('./question-manager/question-manager.module').then( m => m.QuestionManagerPageModule)
  },
  {
    path: 'export',
    loadChildren: () => import('./export/export.module').then( m => m.ExportPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
