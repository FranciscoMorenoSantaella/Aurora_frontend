import { Component, OnInit, ViewChild } from '@angular/core';
import SwiperCore, { Pagination, Autoplay, SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';


//Para que el swiper tenga paginacion
SwiperCore.use([Pagination]);
//Para que se mueva solo
SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-swiperc',
  templateUrl: './swiperc.component.html',
  styleUrls: ['./swiperc.component.scss'],
})
export class SwipercComponent implements OnInit {

  @ViewChild('swiper') swiper: SwiperComponent;



  config: SwiperOptions = {
    //El numero de slides que se muestran a la vez
    slidesPerView: 1,
    //El espacio que hay para cambiar de un slide a otro
    spaceBetween: 50,
    //Sirve para que se cambien de forma automatica los slides
    autoplay: true,
    //Loop sirve para que la animacion del autoplay no vaya hacia atras cuando se acaben los slides
    loop: true,
  };

  
  constructor() { }

  ngOnInit() {}


  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
}
