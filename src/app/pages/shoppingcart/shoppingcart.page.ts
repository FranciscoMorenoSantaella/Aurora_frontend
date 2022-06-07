import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { Image } from 'src/app/model/Image';
import { Product } from 'src/app/model/Product';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {
  client:Client;
  productlist:Product[];
  image:Image;
  precio:Number;
  constructor(private productservice:ProductService, private storage:Storage, private imageservice:ImageService, private shoppingcartservice:ShoppingcartService) { }

  async ngOnInit() {
   await this.getShoppingcartProductsByClientId(1);
   await this.getImgByProductId();
   await this.getTotalPrice();
   

    
  }

  async getShoppingcartProductsByClientId(client_id:Number){
    this.productlist = await this.productservice.getShoppingcartProductsByClientId(client_id);
    
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

  async getTotalPrice(){
    this.precio = await this.shoppingcartservice.getTotalPrice(1);
  }

  async getAmount(){
    
  }



}
