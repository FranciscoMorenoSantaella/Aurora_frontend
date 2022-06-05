import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { SwiperModule } from 'swiper/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HeadercComponent } from 'src/app/components/headerc/headerc.component';
import { SwipercComponent } from 'src/app/components/swiperc/swiperc.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage,HeadercComponent,SwipercComponent]
})
export class HomePageModule {}
