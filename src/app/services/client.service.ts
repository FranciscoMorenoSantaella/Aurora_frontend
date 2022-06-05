import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client } from '../model/Client';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  endpoint:any = environment.endpoint + environment.apiClient;
  constructor(public http: HttpClient) { }

   /**
   * Metodo que sirve para crear un nuevo usuario en la aplicacion
   * @param user es el usuario que vamos a crear
   * @returns devuelve una promesa con el usuario
   */
    public async createClient(client:Client):Promise<Client>{
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.post(this.endpoint, client).toPromise();
         
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

    public async getClientByUid(uid:String){
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.endpoint+ "getclientbyuid/" +uid).toPromise();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }
    public async getClientById(id:number){
      return new Promise(async (resolve, reject) => {
        try {
          let result: any = await this.http.get(this.endpoint+ "getclientbyid/" +id).toPromise();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    }

    
}
