import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage  {
  client:Client;
  constructor(private router:Router,private storage:Storage,private authservice:AuthService, private alertservice:AlertserviceService,private toast:ToastController) { }

  async ionViewDidEnter() {
    this.client = await this.storage.get('client');
  
  }

  /**
   * Metodo para ir a detalles de la cuenta
   */
  goToMyAccount(){
    this.router.navigate(['myaccount']);
  }

  /**
   * Metodo para ir al carro de la compra
   */
  goToShoppingCart(){
    this.router.navigate(['shoppingcart']);
  }
 

  /**
   * Metodo para cerrar sesion
   */
  logout(){
    this.alertservice.presentToast('Se ha cerrado sesión correctamente', 'success');
    this.authservice.logout();
  }


  /**
   * Metodo para ir a productos
   */
  goToProducts(){
    this.router.navigate(['products']);
  }


  
}
