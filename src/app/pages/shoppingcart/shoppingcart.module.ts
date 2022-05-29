import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingcartPageRoutingModule } from './shoppingcart-routing.module';

import { ShoppingcartPage } from './shoppingcart.page';
import { SwipercComponent } from 'src/app/components/swiperc/swiperc.component';
import { SwiperModule } from 'swiper/angular';
import { HeadercwithbackbuttonComponent } from 'src/app/components/headercwithbackbutton/headercwithbackbutton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingcartPageRoutingModule,
    SwiperModule
  ],
  declarations: [ShoppingcartPage,HeadercwithbackbuttonComponent,SwipercComponent]
})
export class ShoppingcartPageModule {}
