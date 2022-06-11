import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Client } from 'src/app/model/Client';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { ClientService } from 'src/app/services/client.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-editmyaccount',
  templateUrl: './editmyaccount.page.html',
  styleUrls: ['./editmyaccount.page.scss'],
})
export class EditmyaccountPage implements OnInit {
  client:Client;
  formUpdateClient: FormGroup; 
  constructor(private modalcontroller:ModalController, private storage:StorageService, private clientservice:ClientService, private loadingservice:LoadingService, private fb:FormBuilder,
    private alertservice:AlertserviceService
    ) { }

  async ngOnInit() {




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

/**
 * Metodo que carga el cliente al entrar a la vista
 */
async ionViewDidEnter() {
  this.loadingservice.presentLoading();
  let client = await this.storage.get('client');
  this.client = await this.clientservice.getClientById(client.id);
  this.loadingservice.dismissing();
}

  

  /**
   * Metodo que sirve para actualizar los campos del cliente según los campos que hemos cargado en el formulario
   * este metodo nos muestra una alerta si se ha actualizado correctamente o otra si ha fallado
   */
  async updateClient(){
    let client:Client = {
      id:this.client.id,
      name:this.formUpdateClient.get('name').value,
      surname:this.formUpdateClient.get('surname').value,
      phonenumber:this.formUpdateClient.get('phonenumber').value,
      email:this.client.email,
      uid:this.client.uid,
      balance:this.client.balance
      
    }
    await this.loadingservice.presentLoading();
    let result = this.clientservice.createClient(client);
    if(result != null){
      this.alertservice.presentToast("El usuario se ha actualizado correctamente","success");
      this.storage.set('client',result);
      this.ionViewDidEnter();
      
    }else{
      this.alertservice.presentToast("No se ha podido actualizar el usuario","danger");
    }
 
    await this.loadingservice.dismissing();
  }

  
}
