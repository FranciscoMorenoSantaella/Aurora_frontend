import { Injectable } from '@angular/core';
import {
  AlertController,
  IonicSafeString,
  ToastController,
} from '@ionic/angular';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class AlertserviceService {
  public loading: HTMLIonLoadingElement;

  constructor(
    public toast: ToastController,
    private alertcontroller: AlertController,
    private loadingservice: LoadingService
  ) {}
  /**
   * Metodo que muestra un toast
   * @param msg es el texto que va a mostrar el toast
   * @param cl es el color que va a tener dicho toast. (danger,success,primary...)
   */
  async presentToast(msg: string, cl: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: cl,
      position: 'bottom',
    });
    toast.present();
  }

  async presentAlert(msg: string, title: string) {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async confirmAlert(header: any,message: any,cancelText: any,okText: any): Promise<Boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertcontroller.create({
        header: header,
        message: message,
        buttons: [
          {
            text: cancelText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (cancel) => {
              resolve(false);
            }
          }, {
            text: okText,
            handler: (ok) => {
              resolve(true);
            }
          }
        ]
      });
      alert.present();
    });
  }
}
