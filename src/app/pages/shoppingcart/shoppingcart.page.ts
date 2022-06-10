import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { Image } from 'src/app/model/Image';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { AlertserviceService } from 'src/app/services/alertservice.service';
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
  client: Client;
  productlist: Product[] = [];
  image: Image;
  precio: number;
  orderlist: Order[];
  shoppingcartid: number;
  product: Product;
  aux: Boolean;
  constructor(
    private productservice: ProductService,
    private storage: StorageService,
    private imageservice: ImageService,
    private shoppingcartservice: ShoppingcartService,
    private orderservice: OrderService,
    private loadingservice: LoadingService,
    private router: Router,
    private alertservice: AlertserviceService
  ) {}

  async ngOnInit() {
    //this.getOrderByShoppingCartId(this.shoppingcartid);
  }

  async ionViewDidEnter() {
    await this.loadingservice.presentLoading();
    this.client = await this.storage.get('client');
    await this.getLastShoppingCartIdNotPayedByClientId(this.client.id);
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getImgByProductId();
    await this.getTotalPrice();
    console.log(this.orderlist);
    await this.loadingservice.dismissing();
  }

  /* async getShoppingcartProductsByClientId(client_id:number){
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

  async getTotalPrice() {
    this.precio = await this.shoppingcartservice.getTotalPrice(
      this.shoppingcartid
    );
  }

  async getAmount() {}

  async getOrderByShoppingCartId(shoppingcart_id: number) {
    this.orderlist = await this.orderservice.getOrderByShoppingCartId(
      shoppingcart_id
    );
    console.log(this.orderlist);
  }

  async getLastShoppingCartIdNotPayedByClientId(client_id: number) {
    this.shoppingcartid =
      await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(
        client_id
      );
    console.log(this.shoppingcartid);
  }

  async deleteOrder(order_id: number) {
    this.orderservice.deleteOrder(order_id);
    this.reloadPage();
  }

  async reloadPage() {
    this.ionViewDidEnter();
  }

  async goToProduct(product: Product) {
    this.storage.set('product', product);
    this.router.navigate(['product']);
  }

  async payShoppingCart() {
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getImgByProductId();
    let confirmed = await this.alertservice.confirmAlert(
      'Pago de la compra',
      '¿Seguro que quieres realizar la compra con un precio final de: ' +
        (await this.getTotalPrice()),
      'Cancelar',
      'Aceptar'
    );
    console.log(confirmed);
    if (confirmed) {
      for (let i = 0; this.orderlist.length > i; i++) {
        let amount = this.orderlist[i]?.amount;
        console.log('cantidad: ' + amount);
        let product = this.productservice.getProductById(
          this.orderlist[i]?.product.id
        );
        console.log('orderlist: ' + this.orderlist[i]?.product.id);
        if (amount < this.orderlist[i]?.product.stock) {
          await this.productservice.subtractStock(
            amount,
            this.orderlist[i]?.product.id
          );
        } else {
          this.aux = false;
        }
      }
      if (this.aux == false) {
        this.alertservice.presentAlert(
          'No hay productos suficientes',
          'Error en la compra'
        );
      }
      {
        let result = await this.shoppingcartservice.payShoppingCart(
          this.client.id,
          this.shoppingcartid
        );

        if (result) {
          this.alertservice.presentAlert(
            'Tu pedido se ha realizado con exito, gracias por comprar!',
            'Compra realizada'
          );
          await this.reloadPage();
        } else {
          this.alertservice.presentAlert(
            'No tienes saldo suficiente para comprar los productos',
            'No se ha realizado la compra'
          );
        }
      }
    }
  }

  async goToProducts() {
    this.router.navigate(['products']);
  }
}
