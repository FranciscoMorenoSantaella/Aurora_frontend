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
   * @param client es el client que vamos a crear
   * @returns devuelve una promesa con el cliente
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

    /**
     * Metodo que trae a un cliente segun su uid
     * @param uid es la uid del clente (la que devuelve firebase)
     * @returns un cliente
     */
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


  /**
   * Trae un cliente segun su id
   * @param client_id es el id del cliente
   * @returns una promesa con un cliente
   */
  public async getClientById(client_id:Number):Promise<Client> {
    return new Promise(async (resolve, reject) => {
      try {
        let result: any = (await this.http
          .get(this.endpoint + client_id)
          .toPromise()) as Client;
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

    
}
