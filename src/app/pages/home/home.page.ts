import {
  AfterContentChecked,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { IonSegment } from '@ionic/angular';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from 'src/app/services/auth.service';
import { Client } from 'src/app/model/Client';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { Storage } from '@ionic/storage';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements AfterContentChecked {
  @ViewChild('formLogin', {static:false}) formlogin: NgForm;
  @ViewChild('formSignUp', {static:false}) formsignup: NgForm;
  @ViewChild('segment') segment: IonSegment;
  segmentaux: Boolean = true;
  formLogin: FormGroup;
  formSignUp: FormGroup;
  client:Client;



  constructor(private router: Router, private fb: FormBuilder, private clientservice:ClientService,private authservice:AuthService,private storage:StorageService,
    private alertservice:AlertserviceService, private loadingservice:LoadingService
    ) {}

  async ngOnInit() {
    
    this.formLogin = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.formSignUp = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      surname: ['',[Validators.required, Validators.minLength(6)]],
      phonenumber: ['',[Validators.minLength(9)]]

    });
    
  }

  /**
   * Metodo que al entrar a la vista ve si tenemos ya iniciado sesion y nos lleva a welcome si ya la tenemos iniciada de otra ocasion
   */
  async ionViewDidEnter() {
    await this.loadingservice.presentLoading();
    await this.formSignUp?.reset();
    await this.formLogin?.reset();
    this.client = await this.storage.get('client'); 
    await this.loadingservice.dismissing();
    if (this.client) {
      this.router.navigate(['/welcome']);
    }
  }

  ngAfterContentChecked(): void {
    
  }

  /**
   * Metodo que detecta cuando cambia el ion-segment para mostrar el formulario de inicio de sesión o de registrarse segun el booleano auxiliar
   * @param $event este evento se hace cuando detecta un cambio en el ion-segment
   */
  segmentChanged($event) {
    if (this.segment.value == 'login') {
      this.segmentaux = true;
    } else if (this.segment.value == 'signup') {
      this.segmentaux = false;
    }
  }

  /**
   * Metodo para iniciar sesión comparando el uid al haber iniciado sesión en firebase junto a nuestro uid guardado en la base de datos
   * si iniciamos sesion correctamente este metodo nos lleva a la pagina de bienvenida
   */
  async signIn(){
    if(this.formLogin.valid){
      try {
      let result = await this.authservice.signIn(this.formLogin.get('email').value, this.formLogin.get('password').value);
      let client = await this.clientservice.getClientByUid(result.user.uid);
      if(client){
        console.log(client);
        this.storage.set('client',client);
        this.router.navigate(['welcome'])

      }else{

      }

      } catch (error) {
        this.alertservice.presentToast(error,"danger");
      }
    }else{
      this.alertservice.presentToast("Los datos del formulario no son validos","danger");
    }
  }


  /**
   * Metodo que registra a un usuario con email y contraseña en firebase segun los datos de nuestro formulario y a su vez crea el usuario en nuestra base de datos
   * con todos los campos que no se guardan en firebase como por ejemplo numero de telefono, saldo...
   */
  async signUp(){
    if(this.formSignUp.valid){
        let result = await this.authservice.signUp(this.formSignUp.get('email').value,
        this.formSignUp.get('password').value)
        let newClient:Client = {
          id:-1,
          name:this.formSignUp.get('name').value,
          surname:this.formSignUp.get('surname')?.value,
          email:this.formSignUp.get('email').value,
          phonenumber:this.formSignUp.get('phonenumber')?.value,
          balance:1000,
          uid:result
        }
       let client = await this.clientservice.createClient(newClient);
       if(client!=null){
         this.storage.set('client',client);
         this.router.navigate(['welcome']);
       }else{
         this.alertservice.presentToast("Error al crear el usuario en la base de datos","danger");
       }
    }else{
      this.alertservice.presentToast("Los datos del formulario no son validos","danger");
    }
  }

  /**
   * Metodo que nos lleva a la pagina de recuperar contraseña
   */
  goToRecoverPassword(){
    this.router.navigate(['recoverpassword']);
  }

  /**
   * Metodo que nos lleva a la pagina de productos
   */
  goToProducts(){
    this.router.navigate(['products']);
  }
}


