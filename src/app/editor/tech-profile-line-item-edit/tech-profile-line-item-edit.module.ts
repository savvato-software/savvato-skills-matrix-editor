import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechProfileLineItemEditPageRoutingModule } from './tech-profile-line-item-edit-routing.module';

import { TechProfileLineItemEditPage } from './tech-profile-line-item-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TechProfileLineItemEditPageRoutingModule
  ],
  declarations: [TechProfileLineItemEditPage]
})
export class TechProfileLineItemEditPageModule {}
