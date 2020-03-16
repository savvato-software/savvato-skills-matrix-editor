import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';	
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { EditorPageRoutingModule } from './editor-routing.module';

import { EditorPage } from './editor.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    EditorPageRoutingModule,
    DtimTechprofileModule
  ],
  declarations: [EditorPage]
})
export class EditorPageModule {}
