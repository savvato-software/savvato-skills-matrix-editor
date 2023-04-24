import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';	
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

import { SavvatoSkillsMatrixComponentModule } from "savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [EditorPage]
})
export class EditorPageModule {}
