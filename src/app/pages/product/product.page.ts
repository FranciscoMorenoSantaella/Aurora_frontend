import { NumberSymbol } from '@angular/common';
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
  badge:number;
 

  constructor(private productservice:ProductService, private storage:StorageService, private router:Router, private orderservice:OrderService,private loadingservice:LoadingService, private shoppingcartservice:ShoppingcartService,
    private alertservice:AlertserviceService
    ) { }



    /**
     * Metodo que se ejecuta al entrar a la vista, carga al cliente y carga al producto con su imagen y carga el carrito de la compra que tenemos disponible por si deseamos añadir
     * el producto al carro de la compra y calculamos el numero para mostrar en el ion-badge
     */
    async ionViewWillEnter() {
    await this.loadingservice.presentLoading();
    this.client = await this.storage.get('client');
    
    let product = await this.storage.get('product');
    this.product = await this.productservice.getProductById(product.id);
    this.product.url = product.url;
    await this.loadingservice.dismissing();
    await this.getLastShoppingCartIdNotPayedByClientId(this.client.id);
 
   
    this.calculateBadge();
  }

 

  /**
   * Metodo en el que creamos una nueva orden con el id del ultimo carro no pagado del cliente en esta orden se tendra el carro del cliente al que va 
   * a ser añadido el producto
   */
  async addProductToOrder(){
 
    let order:Order = {
      id:null,
      shoppingcart:{id:this.shoppingcartid, ispayed:false},
      product:this.product,
      amount:this.amount
    }
    let product = await this.productservice.getProductById(this.product.id);
    console.log(product?.stock);
    if(this.amount <= product?.stock){
      if(this.product?.stock == 0){
        this.limitAmountAlert('Querias añadir al carro la cantidad de ' + this.amount  + ' y solo hay disponibles ' + product?.stock +  ' ' +  this.product.name, 'Cantidad superada');
      }else{
        let product = await this.orderservice.postOrder(order);
        if(product != null){
          await this.calculateBadge();
          this.alertservice.presentToast("El producto se ha añadido correctamente","success");
        }else{
          this.alertservice.presentToast("El producto no se ha podido añadir","danger");
        }
      }
    }else{
      this.limitAmountAlert('Querias añadir al carro la cantidad de ' + this.amount  + ' y solo hay disponibles ' + product?.stock +  ' ' +  this.product.name, 'Cantidad superada');
    }
  }

  /**
   * Metodo que trae el ultimo carro de la compra no pagado del usuario para luego añadir el producto
   * @param client_id es el id del cliente del que queremos traer el ultimo carro de la compra
   */
  public async getLastShoppingCartIdNotPayedByClientId(client_id:number){
    this.shoppingcartid = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(client_id);
    console.log(this.shoppingcartid);
  }

  /**
   * Metodo que suma el numero de la cantidad de producto que vamos a querer comprar de dicho producto
   */
  async sum(){
    this.amount++;
  }

  async rest(){
    if(this.amount == 1){
      
    }else{
      this.amount--;
    }
  }

  /**
   * Alerta que presentamos cuando sobrepasamos el numero de la cantidad disponible del producto
   * @param msg es el mensaje que se mostrara
   * @param title es el titulo del mensaje que se mostrara
   */
  limitAmountAlert(msg:string,title:string){
      this.alertservice.presentAlert(msg,title);
  }

  /**
   * Metodo que nos lleva al carro de la compra
   */
  goToShoppingCart(){
    this.router.navigate(['shoppingcart']);
  }

  async calculateBadge(){
    let shoopingcartid:number = await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(this.client.id);
   
    this.badge =  (await this.orderservice.getOrderByShoppingCartId(shoopingcartid)).length;
    console.log(this.badge);
   }


   /**
    * Metodo que nos lleva a home
    */
   goToLogin(){
    this.router.navigate(['home'])
   }


}
