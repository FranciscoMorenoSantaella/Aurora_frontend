import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  data:any;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /**
   * Metodo que sirve para según una clave asignarle un valor
   * @param key es la clave a la que se le va a asignar un valor
   * @param value es el valor que tiene relacion con una clave
   */
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  /**
   * Metodo que sirve para traer los datos de una clave del storage
   * @param key es el string que esta relacionado con el valor que queremos extraer
   * @returns devuelve lo que tenga dicha clave
   */
  public get(key: string): Promise<any> {
    return this._storage?.get(key);
  }

  /**
   * Metodo que sirve para borrar una clave existente
   * @param key es la clave que vamos a borrar de storage
   */
  public remove(key: string) {
    this._storage?.remove(key);
  }

  getCurrent(text:string):Promise<User>{
    if(this.storage.get(text)){
      return this.data = this.storage.get(text);
    }else{
       this.storage.remove(text);
    }
  }


}
