import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Product } from 'src/app/model/Product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  page:number = 0;
  product:Product;
  stock:Boolean;
  client:Client;
  constructor(private productservice:ProductService, private storage:StorageService, private router:Router, private orderservice:OrderService) { }

  async ngOnInit() {
    this.product = await this.storage.get('product');
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
