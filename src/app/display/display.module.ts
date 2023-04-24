import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { DisplayPageRoutingModule } from './display-routing.module';

import { DisplayPage } from './display.page';

import { SavvatoSkillsMatrixComponentModule } from "savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    DisplayPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [DisplayPage]
})
export class DisplayPageModule {}
