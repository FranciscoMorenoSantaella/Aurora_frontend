import {
  AfterContentChecked,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import { Router } from '@angular/router';
import SwiperCore, { Pagination,Autoplay } from 'swiper';
import 'swiper/css/autoplay';

import { Capacitor } from '@capacitor/core';
import { IonSegment } from '@ionic/angular';

SwiperCore.use([Pagination]);
SwiperCore.use([Autoplay]);
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;
  @ViewChild('segment') segment:IonSegment;
  login:Boolean = false;

  config: SwiperOptions = {
    //El numero de slides que se muestran a la vez
    slidesPerView: 1,
    //El espacio que hay para cambiar de un slide a otro
    spaceBetween: 50,
    //Sirve para que se cambien de forma automatica los slides
    autoplay:true,
    //Loop sirve para que la animacion del autoplay no vaya hacia atras cuando se acaben los slides
    loop:true,
    
  };
  

  constructor(private router: Router) {}

  async ngOnInit() {
   
    }
  
  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  segmentChanged($event){
    if(this.segment.value =='login'){
      this.login = true;
    }else if(this.segment.value == 'signup'){
      this.login = false;
    }
  }
}
