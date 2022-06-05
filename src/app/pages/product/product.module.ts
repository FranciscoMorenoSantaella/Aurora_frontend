import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';

import { ProductPage } from './product.page';
import { HeadercComponent } from 'src/app/components/headerc/headerc.component';
import { SwipercComponent } from 'src/app/components/swiperc/swiperc.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule,
    SwiperModule
  ],
  declarations: [ProductPage,HeadercComponent,SwipercComponent]
})
export class ProductPageModule {}
