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

  public async postOrder(order: Order) {
    console.log(order);
    await this.http.post(this.endpoint, order).toPromise();
  }

  public async deleteOrder(order_id: Number) {
    console.log(order_id);
    await this.http.delete(this.endpoint + order_id).toPromise();
  }

  /*public async getShoppingcartOrderByClientId(client_id:Number):Promise<Order[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint+ "getshoppingcartordersbyclientid" + "/" + client_id).toPromise() as Order[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }*/

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
