import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../model/Image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

 

  
  public async getImgByProductId(id: Number): Promise<Image> {
    return new Promise(async (resolve, reject) => {
  
     
      try {
        let images = await this.http.get("http://localhost:8080/image/imgurl/" +id).toPromise() as Image;
        resolve(images);
      } catch (error) {
        reject(error);
      }
    });
  }



}
