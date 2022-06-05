import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage  {
  client:Client;
  constructor(private router:Router,private storage:Storage,private authservice:AuthService) { }

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
    this.authservice.logout();
  }

  goToProducts(){
    this.router.navigate(['products']);
  }

  
}
