import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';
import { HeadercComponent } from 'src/app/components/headerc/headerc.component';
import { SwipercComponent } from 'src/app/components/swiperc/swiperc.component';
import { SwiperModule } from 'swiper/angular';
import { HeadercwithbackbuttonComponent } from 'src/app/components/headercwithbackbutton/headercwithbackbutton.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SwiperModule,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePage,HeadercwithbackbuttonComponent,SwipercComponent]
})
export class WelcomePageModule {}
