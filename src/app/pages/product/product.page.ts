import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { Shoppingcart } from 'src/app/model/shoppingcart';
import { AlertserviceService } from 'src/app/services/alertservice.service';
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
  amount:number = 1;
 

  constructor(private productservice:ProductService, private storage:StorageService, private router:Router, private orderservice:OrderService,private loadingservice:LoadingService, private shoppingcartservice:ShoppingcartService,
    private alertservice:AlertserviceService
    ) { }


  async ionViewWillEnter() {
    this.client = await this.storage.get('client');
    await this.loadingservice.presentLoading();
    
    this.product = await this.storage.get('product');
    await this.loadingservice.dismissing();
    await this.getLastShoppingCartIdNotPayedByClientId(this.client.id);
 
    console.log(this.shoppingcartid);
  }

 


  async addProductToOrder(){
 
    let order:Order = {
      id:null,
      shoppingcart:{id:this.shoppingcartid, ispayed:false},
      product:this.product,
      amount:this.amount
    }
    if(this.amount<=this.product.stock){
      await this.orderservice.postOrder(order);
    }else{
      this.limitAmountAlert('Querias añadir al carro la cantidad de ' + this.amount  + ' y solo hay disponibles ' + this.product.stock +  ' ' +  this.product.name, 'Cantidad superada');
    }
  }

  public async getLastShoppingCartIdNotPayedByClientId(client_id:Number){
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(client_id);
    console.log(this.shoppingcartid);
  }

  async sum(){
    this.amount++;
  }

  async rest(){
    if(this.amount == 1){
      
    }else{
      this.amount--;
    }
  }

  limitAmountAlert(msg:string,title:string){
      this.alertservice.presentAlert(msg,title);
  }

  goToShoppingCart(){
    this.router.navigate(['shoppingcart']);
  }


}
