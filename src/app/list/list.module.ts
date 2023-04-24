import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';

import { SavvatoSkillsMatrixComponentModule } from "@savvato-software/savvato-skills-matrix-component";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    SavvatoSkillsMatrixComponentModule
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
