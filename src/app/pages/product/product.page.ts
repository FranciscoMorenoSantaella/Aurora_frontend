import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { Shoppingcart } from 'src/app/model/shoppingcart';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
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
  shoppingcartid:Number;
  shoppingcart:Shoppingcart = {id:3,date: new Date(),totalprice:50,ispayed:false};

  constructor(private productservice:ProductService, private storage:StorageService, private router:Router, private orderservice:OrderService,private loadingservice:LoadingService, private shoppingcartservice:ShoppingcartService) { }


  async ionViewWillEnter() {
    this.client = await this.storage.get('client');
    await this.loadingservice.presentLoading();
    
    this.product = await this.storage.get('product');
    await this.loadingservice.dismissing();
    await this.getLastShoppingCartIdNotPayedByClientId(this.client.id);
    this.shoppingcartid = 3;
    console.log(this.shoppingcartid);
  }

 
  goToShoppingCart(){

  }

  async addProductToOrder(){
 
    let order:Order = {
      id:null,
      shoppingcart:this.shoppingcart,
      product:this.product
    }
    await this.orderservice.postOrder(order);
  }

  public async getLastShoppingCartIdNotPayedByClientId(client_id:Number){
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(client_id);
    console.log(this.shoppingcartid);
  }



}
