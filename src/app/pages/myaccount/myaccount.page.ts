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
  constructor(private router:Router, private modalcontroller:ModalController, private clientservice:ClientService, private storage:StorageService,private loadingservice:LoadingService) { }

  async ionViewDidEnter() {
    await this.loadingservice.presentLoading();
    this.client = await this.storage.get('client');
    await this.loadingservice.dismissing();
    console.log(this.client);
  
  }

  async openModal(){
    const modal = await this.modalcontroller.create({
      component:EditmyaccountmodalComponent
    });
    modal.present();
  }


}
