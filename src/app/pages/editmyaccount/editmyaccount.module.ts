import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmyaccountPageRoutingModule } from './editmyaccount-routing.module';

import { EditmyaccountPage } from './editmyaccount.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmyaccountPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditmyaccountPage]
})
export class EditmyaccountPageModule {}
