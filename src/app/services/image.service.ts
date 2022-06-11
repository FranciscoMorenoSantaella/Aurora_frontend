import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Image } from '../model/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  endpoint: any = environment.endpoint + environment.apiImage;
  constructor(private http:HttpClient) { }

 

  /**
   * Metodo que trae la imagen de un producto segun su id
   * @param id es el id del producto
   * @returns devuelve una promesa con una imagen
   */
  public async getImgByProductId(id: Number): Promise<Image> {
    return new Promise(async (resolve, reject) => {
      try {
        let images = await this.http.get(this.endpoint + "imgurl/" +id).toPromise() as Image;
        resolve(images);
      } catch (error) {
        reject(error);
      }
    });
  }



}
