import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { Image } from 'src/app/model/Image';
import { Order } from 'src/app/model/Order';
import { Product } from 'src/app/model/Product';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ClientService } from 'src/app/services/client.service';
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
  formatprice:any;
  formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });
  constructor(
    private productservice: ProductService,
    private storage: StorageService,
    private imageservice: ImageService,
    private shoppingcartservice: ShoppingcartService,
    private orderservice: OrderService,
    private loadingservice: LoadingService,
    private router: Router,
    private alertservice: AlertserviceService,
    private clientservice: ClientService
  ) {}

  async ngOnInit() {
    //this.getOrderByShoppingCartId(this.shoppingcartid);
  }

  /**
   * Metodo que al entrar en la vista muestra un loading para cargar el cliente traer su ultimo carro no pagado, traer las ordenes de su ultimo carro no pagado, cargar las fotos
   * y calcular el precio de la suma de todos los productos multiplicado por la cantidad de cada uno
   */
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

  /**
   * Metodo que carga las imagenes de los productos y se la asigna a cada uno
   */
  async getImgByProductId() {
    for (let i: number = 0; this.orderlist.length > i; i++) {
      this.image = await this.imageservice.getImgByProductId(
        this.orderlist[i].product.id
      );

      this.orderlist[i].product.url =
        'https://aurora-heroka.herokuapp.com/image/files/' + this.image.uniquename;
      console.log(this.orderlist[i].product.url);
    }
  }

  /**
   * Metodo que calcula el precio final de los productos multiplicando la cantidad de cada uno por el precio del producto
   */
  async getTotalPrice() {
    this.precio = await this.shoppingcartservice.getTotalPrice(
      this.shoppingcartid
    );
    this.formatprice = this.formatter.format(this.precio);
  }

  /**
   * Metodo que trae las ordenes del carro de la compra
   * @param shoppingcart_id es la id del carro de la compra del que queremos traer sus ordenes
   */
  async getOrderByShoppingCartId(shoppingcart_id: number) {
    this.orderlist = await this.orderservice.getOrderByShoppingCartId(
      shoppingcart_id
    );
    console.log(this.orderlist);
  }

  /**
   * Metodo que trae el ultimo carro no pagado de un cliente
   * @param client_id es el id del cliente del que queremos traer su ultimo carro no pagado
   */
  async getLastShoppingCartIdNotPayedByClientId(client_id: number) {
    this.shoppingcartid =
      await this.shoppingcartservice.getLastShoppingCartIdNotPayedByClientId(
        client_id
      );
    console.log(this.shoppingcartid);
  }

  /**
   * Metodo que elimina una orden (basicamente esto saca un producto del carrito en la base de datos y en la vista se quita tambien dicho producto)
   * @param order_id
   */
  async deleteOrder(order_id: number) {
    this.orderservice.deleteOrder(order_id);
    this.reloadPage();
  }

  /**
   * Metodo que recarga la paginaa
   */
  async reloadPage() {
    this.ionViewDidEnter();
  }

  /**
   * Metodo que nos lleva al producto
   * @param product es el producto al que queremos ir
   */
  async goToProduct(product: Product) {
    this.storage.set('product', product);
    this.router.navigate(['product']);
  }

  /**
   * Metodo que sirve para pagar el carrito, presentamos un loading traemos la ordenes desde la base de datos para ver que nada haya cambiado
   * calculamos su precio total de nuevo, mostramos una alerta que nos pregunta si queremos pagar o cancelar
   * si queremos pagar se restan los productos del stocky se resta nuestro saldo y se pone este carrito en pagado (ispayed = true) que es como
   * si ya estuviese el pedido en camino. (si queremos pagar pero no tenemos saldo suficiente no se resta stock ni se resta saldo al cliente se cancela la accion y ya)
   */
  async payShoppingCart() {
    await this.loadingservice.presentLoading();
    await this.getOrderByShoppingCartId(this.shoppingcartid);
    await this.getTotalPrice();
    console.log(this.formatprice);
    await this.getImgByProductId();
    
    this.loadingservice.dismissing();
    let confirmed = await this.alertservice.confirmAlert(
      'Pago de la compra',
      '¿Seguro que quieres realizar la compra con un precio final de: ' +
        await this.formatprice 
        ,
      'Cancelar',
      'Aceptar'
    );
    await this.loadingservice.presentLoading();
    console.log(confirmed);
    this.getTotalPrice();
    this.client = await this.clientservice.getClientById(this.client.id);
    if (confirmed) {
      if (this.client.balance >= this.precio) {
        for (let i = 0; this.orderlist.length > i; i++) {
          let amount = this.orderlist[i]?.amount;
          console.log('cantidad: ' + amount);
          let product = this.productservice.getProductById(
            this.orderlist[i]?.product.id
          );
          console.log('orderlist: ' + this.orderlist[i]?.product.id);
          if (amount <= this.orderlist[i]?.product.stock) {
            await this.productservice.subtractStock(
              amount,
              this.orderlist[i]?.product.id
            );
          } else {
            this.aux = false;
          }
        }
      } else {
        this.alertservice.presentAlert(
          'No tienes saldo suficiente para comprar los productos',
          'No se ha realizado la compra'
        );
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
        }
      }
    } else {
   
    }
    await this.loadingservice.dismissing();
  }

  /**
   * Metodo que nos lleva a la pagina de productos
   */
  async goToProducts() {
    this.router.navigate(['products']);
  }
}
