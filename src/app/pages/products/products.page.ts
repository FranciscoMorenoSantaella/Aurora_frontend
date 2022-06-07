import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSegment } from '@ionic/angular';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  @ViewChild('segment') segment: IonSegment;
  @ViewChild(IonContent, { static: false }) content: IonContent;
  page: number = 0;
  productlist: Product[];
  urllist: Promise<String[]>;
  imagelist: Image[];
  image: Image;
  url = 'localhost:8080/image/files/1f6f8a27-54dc-436c-aff0-4db4735f84ed.png';
  segmentaux: String;

  constructor(
    private productservice: ProductService,
    private router: Router,
    private storage: StorageService,
    private imageservice: ImageService,
    private loadingservice:LoadingService
  ) {}

  async ngOnInit() {
    this.storage.remove('product');
    await this.loadingservice.presentLoading();
    await this.getProducts();
    await this.getImgByProductId();
    await this.loadingservice.dismissing();

  }

  async getProducts() {
    this.productlist = await this.productservice.getProductsByPage(
      this.page,
      10
    );
  }

  async getImgByProductId() {
    for (let i: number = 0; this.productlist.length > i; i++) {
      this.image = await this.imageservice.getImgByProductId(
        this.productlist[i].id
      );

      this.productlist[i].url =
        'http://localhost:8080/image/files/' + this.image.uniquename;
      console.log(this.productlist[i]);
    }
    console.log(this.productlist[0].url);
  }

  async goToProduct(product: Product) {
    this.storage.set('product', product);
    this.router.navigate(['product']);
  }



  async segmentChanged($event) {
  
      if (this.segment.value == 'todos') {
        this.page = 0;
        this.slideTop();
        this.productlist = await this.productservice.getProductsByPage(this.page, 10);
        this.getImgByProductId();
      }
      else if (this.segment.value == 'anillos') {
        this.page = 0;
        this.slideTop();
        this.productlist = await this.productservice.getRingProductsByPage(this.page, 10);
        this.getImgByProductId();
      } else if (this.segment.value == 'collares') {
        this.page = 0;
        this.slideTop();
        this.productlist = await this.productservice.getnecklaceProductsByPage(this.page, 10);
        this.getImgByProductId();
      }
    }

    slideTop() {
      this.content.scrollToTop(0);
    }

  }

