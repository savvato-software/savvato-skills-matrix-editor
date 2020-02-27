import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechProfileTopicEditPageRoutingModule } from './tech-profile-topic-edit-routing.module';

import { TechProfileTopicEditPage } from './tech-profile-topic-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechProfileTopicEditPageRoutingModule
  ],
  declarations: [TechProfileTopicEditPage]
})
export class TechProfileTopicEditPageModule {}
