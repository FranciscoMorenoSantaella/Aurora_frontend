import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Client } from 'src/app/model/Client';
import { ClientService } from 'src/app/services/client.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-editmyaccountmodal',
  templateUrl: './editmyaccountmodal.component.html',
  styleUrls: ['./editmyaccountmodal.component.scss'],
})
export class EditmyaccountmodalComponent implements OnInit {
  client:Client;
  formUpdateClient: FormGroup;
  constructor(private modalcontroller:ModalController, private storage:Storage, private clientservice:ClientService, private loadingservice:LoadingService, private fb:FormBuilder) { }

  async ngOnInit() {
    await this.loadingservice.presentLoading();
    this.client = await this.storage.get('client');
    await this.loadingservice.dismissing();

    this.formUpdateClient = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['',[Validators.required, Validators.minLength(6)]],
      phonenumber: ['',[Validators.minLength(9)]]
  });
}

  async close(){
    this.modalcontroller.dismiss();
  }


}
