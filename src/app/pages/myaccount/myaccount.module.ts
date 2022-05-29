import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaccountPageRoutingModule } from './myaccount-routing.module';

import { MyaccountPage } from './myaccount.page';
import { SwipercComponent } from 'src/app/components/swiperc/swiperc.component';
import { SwiperModule } from 'swiper/angular';
import { HeadercwithbackbuttonComponent } from 'src/app/components/headercwithbackbutton/headercwithbackbutton.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaccountPageRoutingModule,
    SwiperModule
  ],
  declarations: [MyaccountPage,SwipercComponent,HeadercwithbackbuttonComponent]
})
export class MyaccountPageModule {}
