import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { DisplayPageRoutingModule } from './display-routing.module';

import { DisplayPage } from './display.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    DisplayPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [DisplayPage]
})
export class DisplayPageModule {}
