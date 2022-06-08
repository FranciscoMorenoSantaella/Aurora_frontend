import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root',
})
export class ShoppingcartService {
  endpoint: any = environment.endpoint + environment.apiShoppingCart;
  constructor(private http: HttpClient) {}

  public async getTotalPrice(shoppingcart_id: Number): Promise<Number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint + 'totalprice' + '/' + shoppingcart_id)
          .toPromise()) as Number[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getLastShoppingCartIdNotPayedByClientId(client_id:Number):Promise<Number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint + 'getlastshoppingcartidnotpayedbyclientid' + '/' + client_id)
          .toPromise()) as Number;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}
