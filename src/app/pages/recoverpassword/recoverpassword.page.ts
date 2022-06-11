import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertserviceService } from 'src/app/services/alertservice.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recoverpassword',
  templateUrl: './recoverpassword.page.html',
  styleUrls: ['./recoverpassword.page.scss'],
})
export class RecoverpasswordPage implements OnInit {
  formRecover:FormGroup;
  constructor(private authservice:AuthService, private fb:FormBuilder, private alertservice:AlertserviceService) { }

  /**
   * Metodo que al iniciar la pagina crea la validacion del formulario
   */
  ngOnInit() {
    this.formRecover = this.fb.group({
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
    });
}

/**
 * Metodo que sirve para que te llegue un email para recuperar contraseña al correo introducido en el formulario
 */
  recoverPassword(){
    if(this.formRecover.get('email').valid){
    
    
    this.authservice.recover(this.formRecover.get('email').value);
    }else{
      this.alertservice.presentToast("El correo no es valido","danger")
    }
  }
}
