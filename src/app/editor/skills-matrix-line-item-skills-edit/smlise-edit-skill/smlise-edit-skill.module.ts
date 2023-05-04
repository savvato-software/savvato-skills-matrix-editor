import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmliseEditSkillPageRoutingModule } from './smlise-edit-skill-routing.module';

import { SmliseEditSkillPage } from './smlise-edit-skill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmliseEditSkillPageRoutingModule
  ],
  declarations: [SmliseEditSkillPage]
})
export class SmliseEditSkillPageModule {}
