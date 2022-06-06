import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../model/Image';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  endpoint: any = environment.endpoint + environment.apiProduct;
  constructor(private http:HttpClient) { }

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


}
