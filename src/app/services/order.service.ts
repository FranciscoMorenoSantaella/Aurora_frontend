import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  endpoint: any = environment.endpoint + environment.apiOrder;
  constructor(private http: HttpClient) {}

  /**
   * Metodo para crear una nueva orden (en la base de datos)
   * @param order es la orden que vamos a crear
   */
  public async postOrder(order: Order):Promise<Order> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .post(
            this.endpoint,order

          )
          .toPromise()) as Order[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo para borra una orden
   * @param order_id es el id de la orden que vamos a borrar
   */
  public async deleteOrder(order_id: Number) {
    console.log(order_id);
    await this.http.delete(this.endpoint + order_id).toPromise();
  }



  /**
   * Metodo que trae las ordenes de un carro de la compra
   * @param shoppingcart_id 
   * @returns 
   */
  public async getOrderByShoppingCartId(
    shoppingcart_id: Number
  ): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint +
              'getorderbyshoppingcartid' +
              '/' + 
              shoppingcart_id
          )
          .toPromise()) as Order[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
