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

  goToMyAccount(){
    this.router.navigate(['myaccount']);
  }

  goToShoppingCart(){
    this.router.navigate(['shoppingcart']);
  }

  logout(){
    this.alertservice.presentToast('Se ha cerrado sesión correctamente', 'success');
    this.authservice.logout();
  }

  goToProducts(){
    this.router.navigate(['products']);
  }

  async a(){
    await this.alertservice.presentToast("Nota agrageda Correctamente", "success");
  }

  async presentToast(msg:string,cl:string) {
    let toast = await this.toast.create({
      message: 'Toast Message',
      duration: 3000
    });
    return await toast.present();

  }
  
}
