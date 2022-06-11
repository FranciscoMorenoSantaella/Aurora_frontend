import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../model/Image';
import { Product } from '../model/Product';
import { ShoppingcartService } from './shoppingcart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  endpoint: any = environment.endpoint + environment.apiProduct;
  constructor(private http:HttpClient, private shoppingcartservice:ShoppingcartService) { }

  /**
   * Metodo para traer productos por pagina 
   * @param page es la pagina de los productos que queremos traer 
   * @param limit es el numero de productos que traeremos por pagina
   * por ejemplo la pagina 0 con limite 10 traera los productos del 1 al 9
   * @returns devuelve una promesa de una lista de productos
   */
  public getProductsByPage(page: Number, limit: Number): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getproduct/' + page + '/' + limit)
          .toPromise();
        let clublist = result.content;
        resolve(clublist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que devuelve un producto segun su id
   * @param product_id es la id del producto
   * @returns devuelve una promesa con un producto
   */
  public async getProductById(
    product_id: number
  ): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint + product_id
          )
          .toPromise()) as Product;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que trae productos de forma paginada segun su categoria en este caso de tipo collar
   * @param page es la pagina de los productos que queremos traer 
   * @param limit es el numero de productos que traeremos por pagina
   * por ejemplo la pagina 0 con limite 10 traera los productos del 1 al 9
   * @returns una promesa de una lista de productos
   */
  public getnecklaceProductsByPage(page: Number, limit: Number): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getnecklace/' + page + '/' + limit)
          .toPromise();
        let clublist = result.content;
        resolve(clublist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que trae productos de forma paginada segun su categoria en este caso de tipo anillo
   * @param page es la pagina de los productos que queremos traer 
   * @param limit es el numero de productos que traeremos por pagina
   * por ejemplo la pagina 0 con limite 10 traera los productos del 1 al 9
   * @returns una promesa de una lista de productos
   */
  public getRingProductsByPage(page: Number, limit: Number): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http
          .get(this.endpoint + 'getrings/' + page + '/' + limit)
          .toPromise();
        let clublist = result.content;
        resolve(clublist);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que devuelve los productos de un carro de la compra segun el id del cliente
   * @param client_id es el id del cliente
   * @returns devuelve una promesa con productos
   */
  public async getShoppingcartProductsByClientId(client_id:Number):Promise<Product[]>{
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = await this.http.get(this.endpoint+ "getshoppingcartproductsbyclientid" + "/" + client_id).toPromise() as Product[];
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Metodo que resta el stock de un producto en especifico
   * @param amount la cantidad que vamos a restar
   * @param product_id es el producto del que vamos a restar la cantidad
   * @returns devuelve una promesa con un boolean (true si se ha realizado la accion o false si no)
   */
  public async subtractStock(
    amount:number,product_id:number
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint+ "subtrackstock/" + amount + "/" + product_id
          )
          .toPromise()) as Boolean;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }



}
