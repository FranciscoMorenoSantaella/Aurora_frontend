import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Product } from 'src/app/model/Product';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage  {
  page:number = 0;
  product:Product;
  stock:Boolean;
  client:Client;

  constructor(private productservice:ProductService, private storage:StorageService, private router:Router, private orderservice:OrderService,private loadingservice:LoadingService) { }


  async ionViewWillEnter() {
    await this.loadingservice.presentLoading();
    
    this.product = await this.storage.get('product');
    await this.loadingservice.dismissing();
  }

 
  goToShoppingCart(){

  }

  addProductToOrder(){
    let order = {
      client:this.client,
      product:this.product
    }
    this.orderservice.postOrder(order);
  }

}
