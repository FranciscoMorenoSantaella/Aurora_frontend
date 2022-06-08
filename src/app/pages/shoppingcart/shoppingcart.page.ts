import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { Image } from 'src/app/model/Image';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { ImageService } from 'src/app/services/image.service';
import { LoadingService } from 'src/app/services/loading.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {
  client:Client;
  productlist:Product[] = [];
  image:Image;
  precio:Number;
  orderlist:Order[];
  shoppingcartid:Number;
  product:Product;
  constructor(private productservice:ProductService, private storage:StorageService, private imageservice:ImageService, private shoppingcartservice:ShoppingcartService, private orderservice:OrderService, loadingservice:LoadingService) { }

  async ngOnInit() {  

    //this.getOrderByShoppingCartId(this.shoppingcartid);



    
  }

  
  async ionViewDidEnter() {
    this.client = await this.storage.get("client");
    await this.getLastShoppingCartIdNotPayedByClientId(this.client.id);
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getImgByProductId();
  }

 /* async getShoppingcartProductsByClientId(client_id:Number){
    this.productlist = await this.productservice.getShoppingcartProductsByClientId(client_id);
    
  }*/

 async getImgByProductId() {
    for (let i: number = 0; this.orderlist.length > i; i++) {
      this.image = await this.imageservice.getImgByProductId(
        this.orderlist[i].product.id
      );

      this.orderlist[i].product.url =
        'http://localhost:8080/image/files/' + this.image.uniquename;
      console.log(this.orderlist[i].product.url);
    }

  }

  async getTotalPrice(){
    this.precio = await this.shoppingcartservice.getTotalPrice(1);
  }

  async getAmount(){
    
  }

  async getOrderByShoppingCartId(shoppingcart_id:Number){
    this.orderlist = await this.orderservice.getOrderByShoppingCartId(3);
   console.log(this.orderlist)
  }

  async getLastShoppingCartIdNotPayedByClientId(client_id:Number){
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(client_id);
    console.log(this.shoppingcartid);
  }

 





}
