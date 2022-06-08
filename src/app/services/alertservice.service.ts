import { Injectable } from '@angular/core';
import { AlertController, IonicSafeString, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertserviceService {


  constructor(public toast: ToastController,private alertcontroller:AlertController) { }
  /**
   * Metodo que muestra un toast
   * @param msg es el texto que va a mostrar el toast
   * @param cl es el color que va a tener dicho toast. (danger,success,primary...)
   */
  async presentToast(msg:string,cl:string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color:cl
    });
    toast.present();
  }

  async presentAlert(msg:string, title:string) {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header:title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
