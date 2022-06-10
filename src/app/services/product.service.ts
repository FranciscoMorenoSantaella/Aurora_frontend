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

  public async subtractStock(
    product_id:number, amount:number
  ): Promise<Boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(
            this.endpoint + 'subtractStock/' + amount + '/' + product_id
          )
          .toPromise()) as Boolean;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }



}
