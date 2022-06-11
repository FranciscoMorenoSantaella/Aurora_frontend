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

  /**
   * Metodo que calcula el precio total de la suma de todos los productos multiplicada por la cantidad de cada uno
   * @param shoppingcart_id es el id del carro de la compra
   * @returns devuelve una promesa con un numero
   */
  public async getTotalPrice(shoppingcart_id: number): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint + 'totalprice' + '/' + shoppingcart_id)
          .toPromise()) as number[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que devuelve el id del ultimo carro de la compra que aun no ha pagado
   * @param client_id es el id del cliente del que queremos saber su ultimo carro de la compra con ispayed = false
   * @returns devuelve una promesa con el id del ultimo carro de la compra que no esta pagado
   */
  public async getLastShoppingCartIdNotPayedByClientId(
    client_id: number
  ): Promise<number> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint +
              'getlastshoppingcartidnotpayedbyclientid' +
              '/' +
              client_id
          )
          .toPromise()) as number;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }



  /**
   * Metodo encargado de comprar el carro de la compra este metodo le resta el saldo al cliente y pone el carro de la compra en pagado
   * @param client_id es el id del cliente del que queremos pagar su carro de la compra
   * @param shoppingcart_id es el id del carro de la compra que queremos pagar
   * @returns 
   */
  public async payShoppingCart(
    client_id: number, shoppingcart_id: number
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint + 'payshoppingcart/' + client_id + '/' + shoppingcart_id
          )
          .toPromise()) as Boolean;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  
  
}
