import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-editmyaccountmodal',
  templateUrl: './editmyaccountmodal.component.html',
  styleUrls: ['./editmyaccountmodal.component.scss'],
})
export class EditmyaccountmodalComponent implements OnInit {
  client:Client;
  constructor(private modalcontroller:ModalController, private storage:Storage, private clientservice:ClientService) { }

  async ngOnInit() {
    this.client = await this.storage.get('client');
  }

  async close(){
    this.modalcontroller.dismiss();
  }


}
