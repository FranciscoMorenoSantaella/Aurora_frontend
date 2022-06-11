import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isload:HTMLIonLoadingElement;
  constructor(private loadingcontroller: LoadingController) {}

  /**
   * Metodo que muestra un loading
   */
  async presentLoading() {
    this.isload = await this.loadingcontroller.create({
      message: 'Cargando productos...',
    });
    await this.isload.present();
  }

  /**
   * Metodo para finalizar el loading
   */
  public async dismissing() {
    await this.loadingcontroller.dismiss();
    this.isload = null;
  }


}
