import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionListPageRoutingModule } from './question-list-routing.module';

import { QuestionListPage } from './question-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionListPageRoutingModule
  ],
  declarations: [QuestionListPage]
})
export class QuestionListPageModule {}
