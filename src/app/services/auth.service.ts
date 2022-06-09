import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertserviceService } from './alertservice.service';
import { ClientService } from './client.service';
import { Client } from '../model/Client';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  client:Promise<Client>;

  constructor(public storage: StorageService, public alertservice:AlertserviceService, public router:Router, public angularfirestore: AngularFirestore, // Inject Firestore service
    public auth: AngularFireAuth,public clientservice:ClientService
    ) { }


  getCurrentclient():Promise<Client>{
    if(this.storage.get('client')){
      return this.client = this.storage.get('client');
    }else{
       this.storage.remove('client');
    }
  }

  /**
   * Metodo para cerrar sesion en la aplicacion
   */
  public async logout() {
    let client = this.storage.get('client');
    if (client!=null) {
      this.storage.remove('client');
      await this.alertservice.presentToast(
        'Se ha cerrado sesión correctamente',
        'success'
      );
      await this.router.navigate(['/home']);
    } else {
      this.alertservice.presentToast('No se ha podido cerrar sesión', 'danger');
    }
  }


  async signUp(email:string, password:string):Promise<String>{
    if(email !=null && password !=null){
      try {
        let result = this.auth.createUserWithEmailAndPassword(email,password);
        return (await result).user.uid;
      } catch (error) {
        this.alertservice.presentToast(error,"danger");
      }
    }
  }

  async signIn(email:string, password:string){
    if(email != null && password != null){
      try{
        let result = this.auth.signInWithEmailAndPassword(email,password);
        return result;
      }catch(error){
        this.alertservice.presentToast("El usuario no esta registrado","danger");
      }
    }
  }



  recover(email:string) {
    this.auth.sendPasswordResetEmail(email)
      .then(data => {
        console.log(data);
        this.alertservice.presentToast("Se ha enviado el codigo de recuperación de contraseña","primary"); // this is toastController
        this.router.navigateByUrl('home');
      })
      .catch(err => {

      });
  }

  getCurrentClient():Promise<Client>{
    if(this.storage.get('client')){
      return this.client = this.storage.get('client');
    }else{
       this.storage.remove('client');
    }
  }

}
