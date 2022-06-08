import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { EditmyaccountmodalComponent } from 'src/app/modals/editmyaccountmodal/editmyaccountmodal.component';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage {
  client:Client;
   formatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  formatbalance:string;

  constructor(private router:Router, private modalcontroller:ModalController, private clientservice:ClientService, private storage:StorageService,private loadingservice:LoadingService) { }

  async ionViewDidEnter() {
    await this.loadingservice.presentLoading();
    this.client = await this.storage.get('client');
    await this.getClientById(this.client.id);

    this.formatbalance = (this.formatter.format(this.client.balance));
    await this.loadingservice.dismissing();

  
  }

  async openModal(){
    const modal = await this.modalcontroller.create({
      component:EditmyaccountmodalComponent
    });
    modal.present();
  }

  async getClientById(client_id:number){
    this.client = await this.clientservice.getClientById(client_id)
  }


}
